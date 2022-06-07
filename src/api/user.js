import axios from "@/utils/http";
import store from "@/store/index";
export default {
  login(body) {
    // return axios.post('/sessions', body).then((res) => {
    //     store.commit(res.data);
    // });
    // 生产环境中使用上面的方式
    store;
    body;
    return Promise.resolve("success").then(() => {
      store.commit("login", "token");
    });
  },
  index() {
    axios;
    return Promise.resolve("验证成功");
  },
  register() {
    //TODO 用户注册
  },
  logout() {
    //TODO 用户注销
  },
  like(id) {
    //TODO 判断用户对某个视频的态度
    id;
    return 0;
  },
};
