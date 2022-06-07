import { createStore } from "vuex";

// 创建一个新的 store 实例
export default createStore({
  state() {
    return {
      user: {
        token: "",
        isLogin: false,
      },
      collections: [
        {
          path: "收藏",
          movies: [
            { title: "电影", description: "描述", classification: "分类" },
          ],
        },
      ],
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
      state.user.token = token;
      state.user.isLogin = true;
    },
    setUser(state, data) {
      state.user.token = data.token;
      state.user.isLogin = data.isLogin;
    },
    createCollection(state, name) {
      state.collections.push({ path: name, movies: null });
    },
    deleteCollection(state, index) {
      state.collections.splice(index, 1);
    },
    updateCollection(state, data) {
      state.collections[data.index].path = data.name;
    },
    createComment(state, data) {
      state.movies
        .find((movie) => movie.id === data.id)
        .comments.push({
          avatarUrl: "https://cdn.vuetifyjs.com/images/john.png",
          author: "张三",
          content: data.content,
          date: "2022-06-07",
        });
    },
    deleteComment(state, data) {
      state.movies
        .find((movie) => movie.id === data.id)
        .comments.splice(data.index, 1);
    },
    updateComment(state, data) {
      state.movies.find((movie) => movie.id === data.id).comments[
        data.index
      ].content = data.content;
    },
    addLikes(state, id) {
      state.movies.find((movie) => movie.id === id).likes++;
    },
    minusLikes(state, id) {
      state.movies.find((movie) => movie.id === id).likes--;
    },
    createHistory(state, id) {
      state.history.push(id);
    },
  },
});
