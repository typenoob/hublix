import axios from "@/utils/http";
import store from "@/store/index";
export default {
  //TODO adjust api
  /* A function that is used to search for movies. */
  search(query) {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_TMDB_KEY}&query=${query}&language=zh-CN&page=1&include_adult=false`
    );
  },
  /* Using axios to get the data from the API. */
  detail(id) {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN`
      )
      .then((res) => {
        return {
          title: res.data.title,
          src: `https://image.tmdb.org/t/p/original${res.data.poster_path}`,
          rating: res.data.vote_average / 2,
          imdbId: res.data.imdbId,
        };
      });
  },
  /* Getting the trailer url from the youtube api. */
  trailerUrl(imbdId) {
    return axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.VUE_APP_YOUTUBE_KEY}&q=${imbdId}&type=video&maxResults=1`
      )
      .then((res) => {
        return {
          videoID: res.data.items[0].id.videoId,
          videoUrl: `https://www.youtube.com/embed/${res.data.items[0].id.videoId}`,
        };
      });
  },
  nowPlaying() {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) => {
        return res.data.results.map((movie) => movie.id).splice(0, 6);
      });
  },
  popular() {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) => {
        return res.data.results.map((movie) => movie.id).splice(0, 6);
      });
  },
  topRated() {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) => {
        return res.data.results.map((movie) => movie.id).splice(0, 6);
      });
  },
  upcoming() {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) => {
        return res.data.results.map((movie) => movie.id).splice(0, 6);
      });
  },
  likes: {
    create(id) {
      store.commit("addLikes", id);
    },
    read(id) {
      return store.state.movies.find((movie) => movie.id === id).likes;
    },
    delete(id) {
      store.commit("minusLikes", id);
    },
  },

  comment: {
    /* Creating a comment. */
    create(id, content) {
      store.commit("createComment", { id, content });
    },
    /* Returning the comments of the movie with the id passed as a parameter. */
    readAll(id) {
      return store.state.movies.find((movie) => movie.id === id).comments;
    },
    /* Updating the comment. */
    update(id, index, name) {
      store.commit("updateComment", { id, index, name });
    },

    /* Deleting the comment from the store. */
    delete(id, index) {
      store.commit("deleteComment", { id, index });
    },
  },
};
