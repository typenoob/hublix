import axios from "@/utils/http";
import store from "@/store";
import { router } from "@/router";
export default {
  async login({ username, password }) {
    store.commit(
      "login",
      await axios.post("/session/token", { username, password })
    );
    this.readInfo();
  },
  register({ username, password, nickname, email }) {
    return axios.post("/user", { username, password, nickname, email });
  },
  async logout() {
    await axios.post("/user/logout");
    store.commit("logout");
    router.push("/login");
  },
  async readActive(id) {
    return axios
      .get(`/user/${id}/online`)
      .then((res) => store.commit("readActive", res));
  },
  postActive() {
    return axios.post("/user/online");
  },
  async uploadAvatar(file) {
    let formData = new FormData();
    formData.append("name", "file");
    formData.append("file", file);
    return axios
      .post("/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => this.readInfo());
  },
  async readInfo() {
    return store.commit("setUser", await axios.get("/user"));
  },
  friend: {
    addFriend(name) {
      return axios.post("/friend/apply", { name });
    },
    async deleteFriend(id) {
      return axios.delete(`/friend/${id}`).then(() => this.readInfo());
    },
    async acceptApply(id) {
      return axios.post(`/friend/${id}/accept`).then(() => this.readInfo());
    },
    async rejectApply(id) {
      return axios.post(`/friend/${id}/reject`).then(() => this.readInfo());
    },
    async pinTop(id) {
      return axios.post(`/friend/${id}/pin`).then(() => this.readInfo());
    },
    async readInfo() {
      store.commit("setFriend", {
        apply: await (
          await axios.get("/friend/apply/all")
        ).reduce(
          async (acc, cur) =>
            (await acc).concat(await axios.get(`/user/${cur.friend_id}`)),
          []
        ),
        list: await (
          await axios.get("/friend/all")
        ).reduce(
          async (acc, cur) =>
            (
              await acc
            ).concat(
              Object.assign(await axios.get(`/user/${cur.friend_id}`), {
                is_top: cur.is_top,
                is_active: await axios.get(`/user/${cur.friend_id}/online`),
              })
            ),
          []
        ),
      });
    },
  },
};
