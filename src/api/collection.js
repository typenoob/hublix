import axios from "@/utils/http";
import store from "@/store";
export default {
  async create() {
    return axios.post(`/collection`).then(() => this.readInfo());
  },
  async addMovie(id, movie_id) {
    return axios
      .post(`/collection/${id}/movie/${movie_id}`)
      .then(() => this.readInfo());
  },
  async deleteMovie(movie_id) {
    const collections = await axios.get(`/collection/all`);
    collections.map((collection) => {
      axios
        .delete(`/collection/${collection.id}/movie/${movie_id}`)
        .then(() => this.readInfo());
    });
  },
  async existMovie(id) {
    return await axios.get(`/collection/exist?movie_id=${id}`);
  },
  async getFriendMovies(id) {
    const { default_collection } = await axios.get(`/user/${id}`);
    return await axios.get(`/collection/${default_collection}/movie/all`);
  },
  async getAllCollections() {
    return await axios.get(`/collection/all`);
  },
  async readInfo() {
    store.commit(
      "setCollection",
      await (
        await axios.get("/collection/all")
      ).reduce(async (result, collection) => {
        return (await result).concat({
          name: collection.name,
          id: collection.id,
          movies: await (
            await axios.get(`/collection/${collection.id}/movie/all`)
          ).reduce(
            async (item, movie) =>
              (
                await item
              ).concat({
                id: movie.movie_id,
              }),
            []
          ),
        });
      }, [])
    );
  },
  async update(id, name) {
    return axios
      .post(`/collection/${id}`, { name })
      .then(() => this.readInfo());
  },
  async delete(id) {
    return axios.delete(`/collection/${id}`).then(() => this.readInfo());
  },
};
