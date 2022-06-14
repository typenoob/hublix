import axios from "@/utils/http";
export default {
  //TODO adjust api
  /* A function that is used to search for movies. */
  that: this,
  search(query) {
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_TMDB_KEY}&query=${query}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) =>
        res.results.map((item) => ({
          title: item.title,
          id: item.id,
        }))
      );
  },
  /* Using axios to get the data from the API. */
  async detail(id) {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN`
      )
      .then((res) => {
        return {
          title: res.title,
          src: `https://image.tmdb.org/t/p/original${res.poster_path}`,
          rating: res.vote_average / 2,
          imdbId: res.imdb_id,
          description: res.overview,
          tag: res.tagline,
        };
      });
  },
  /* Getting the trailer url from the youtube api. */
  async trailerUrl(imbdId) {
    return axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.VUE_APP_YOUTUBE_KEY}&q=${imbdId}&type=video&maxResults=1`
      )
      .then((res) => {
        return {
          videoID: res.items[0].id.videoId,
          videoUrl: `https://www.youtube.com/embed/${res.items[0].id.videoId}`,
        };
      });
  },
  async nowPlaying() {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) => {
        return res.results.map((movie) => movie.id).slice(0, 6);
      });
  },
  async popular() {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) => {
        return res.results.map((movie) => movie.id).slice(0, 6);
      });
  },
  async topRated() {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) => {
        return res.results.map((movie) => movie.id).slice(0, 6);
      });
  },
  async upcoming() {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&page=1&include_adult=false`
      )
      .then((res) => {
        return res.results.map((movie) => movie.id).slice(0, 6);
      });
  },
  async filter(page, year, genres, sort) {
    return axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN&sort_by=${sort}.desc&include_adult=false&page=${page}&primary_release_year=${year}&with_genres=${genres}`
      )
      .then((res) => {
        return res.results.map((movie) => movie.id);
      });
  },
  async genres() {
    return axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN`
      )
      .then((res) => {
        return res.genres.map((genre) => {
          return {
            id: genre.id,
            name: genre.name,
          };
        });
      });
  },
  async likes(id) {
    return (await axios.get(`/movie/${id}`, { id })).like_count;
  },
  attitude: {
    like(id) {
      return axios.post(`/movie/${id}/attitude`, { id });
    },
    async read(id) {
      return (await axios.get(`/movie/${id}/attitude`, { id })).attitude;
    },
    dislike(id) {
      return axios.delete(`/movie/${id}/attitude`, { id });
    },
  },
  comment: {
    /* Creating a comment. */
    async create(id, content) {
      await axios.post(`/comment/movie/${id}`, { content });
    },
    /* Returning the comments of the movie with the id passed as a parameter. */
    async readAll(id) {
      return await (
        await axios.get(`/comment/movie/${id}`)
      ).reduce(async (acc, cur) => {
        const user = await axios.get(`/user/${cur.user_id}`);
        return (await acc).concat({
          name: user.name,
          content: cur.content,
          date: cur.created_time,
          avatar_url: user.avatar_url,
          id: cur.id,
        });
      }, []);
    },
    /* Updating the comment. */
    async update(id, content) {
      await axios.post(`/comment/${id}`, { content });
    },

    /* Deleting the comment from the store. */
    async delete(id) {
      await axios.delete(`/comment/${id}`);
    },
  },
  history: {
    onVisited(id) {
      return axios.post(`/history/watch/movie/${id}`);
    },
    readVisited() {
      return axios.get(`/history/watch/movie`);
    },
    async onSearched(id) {
      await axios.post(`/history/search/movie/${id}`);
    },
    async clear() {
      await axios.delete(`/history/search/all`);
    },
    async readSearched() {
      const movies = await axios.get(`/history/search/movie`);
      return Promise.all(
        movies.map(async (item) => ({
          id: parseInt(item.movie_id),
          name: (await this.detail(item.movie_id)).title,
        }))
      );
    },
    async detail(id) {
      return axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.VUE_APP_TMDB_KEY}&language=zh-CN`
        )
        .then((res) => {
          return {
            title: res.title,
            src: `https://image.tmdb.org/t/p/original${res.poster_path}`,
            rating: res.vote_average / 2,
            imdbId: res.imdb_id,
            description: res.overview,
            tag: res.tagline,
          };
        });
    },
  },
};
