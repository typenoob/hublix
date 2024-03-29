import { router } from "@/router";
import store from "@/store";
import axios from "axios";

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL =
  "https://hublix-egg.onrender.com/api/v1";

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (store.state.user.isLogin) {
      config.headers.Authorization = `bearer ${store.state.user.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response.data; //修改响应数据
  },
  (err) => {
    if (err.response.data.message == "jwt expired") {
      store.commit("expire");
      router.push("/login");
    } //登录过期
    return Promise.reject(err);
  }
);

export default axios;
