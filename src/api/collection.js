import axios from "@/utils/http";
import store from "@/store/index";
export default {
  axios: axios,
  create(name) {
    store.commit("createCollection", name);
  },
  readAll() {
    return store.state.collections;
  },
  update(index, name) {
    store.commit("updateCollection", { index, name });
  },
  delete(index) {
    store.commit("deleteCollection", index);
  },
};
