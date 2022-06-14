import { createStore } from "vuex";

// 创建一个新的 store 实例
export default createStore({
  state() {
    return {
      unfinished: false,
      user: {
        token: "",
        isLogin: false,
        isActive: false,
        expired: false,
        info: {
          id: "未知",
          name: "未知",
          nickname: "未知",
          email: "未知",
          avatar_url: "未知",
        },
        friends: {
          apply: [],
        },
      },
      collections: [],
      movies: [
        {
          id: "343611",
          likes: 0,
          comments: [
            {
              avatarUrl: "https://cdn.vuetifyjs.com/images/john.png",
              author: "张三",
              content: "这是一条评论",
              date: "2022-06-01",
            },
            {
              avatarUrl: "https://cdn.vuetifyjs.com/images/john.png",
              author: "李四",
              content: "这是一条评论",
              date: "2022-06-02",
            },
          ],
        },
      ],
      history: [1, 2, 3],
    };
  },
  mutations: {
    login(state, token) {
      Object.assign(state.user, { token, isLogin: true, expired: false });
    },
    logout(state) {
      Object.assign(state.user, { token: "", isLogin: false, expired: false });
    },
    expire(state) {
      Object.assign(state.user, { token: "", isLogin: false, expired: true });
    },
    readActive(state, isActive) {
      state.user.isActive = isActive;
    },
    setActive(state) {
      state.user.isActive = true;
    },
    setUser(state, info) {
      state.user.info = info;
    },
    setFriend(state, friends) {
      state.user.friends = friends;
    },
    setCollection(state, info) {
      state.collections = info;
    },
    alertUnfinished(state) {
      state.unfinished = true;
      setTimeout(() => {
        state.unfinished = false;
      }, 2000);
    },
  },
});
