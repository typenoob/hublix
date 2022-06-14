<template>
  <v-container>
    <MovieList
      v-for="(movie, index) in movies"
      :key="index"
      class="pl-2"
      :id="movie.movie_id"
    />
  </v-container>
</template>
<script>
import MovieList from "@/components/MovieList.vue";
import Movie from "@/api/movie";
export default {
  created() {
    Movie.history.readVisited().then((res) => (this.movies = res));
  },
  data() {
    return {
      movies: [],
    };
  },
  components: { MovieList },
};
</script>
