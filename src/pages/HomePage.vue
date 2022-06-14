<template>
  <v-container>
    <div v-for="(movie, index) in movies" :key="index">
      <v-row class="text-h5 my-3 px-4">{{ movie.subheader }}</v-row>
      <v-row>
        <v-col v-for="id in movie.ids" :key="id" cols="6"
          ><MovieCard :id="id"
        /></v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import Movie from "@/api/movie.js";
import MovieCard from "@/components/MovieCard.vue";
export default {
  name: "HomePage",

  components: { MovieCard },
  created() {
    Movie.nowPlaying().then((res) => {
      this.movies[0].ids = res;
    });
    Movie.popular().then((res) => {
      this.movies[1].ids = res;
    });
    Movie.topRated().then((res) => {
      this.movies[2].ids = res;
    });
    Movie.upcoming().then((res) => {
      this.movies[3].ids = res;
    });
  },
  data() {
    return {
      movies: [
        { subheader: "正在上映" },
        { subheader: "热门" },
        { subheader: "顶级评分" },
        { subheader: "即将发布" },
      ],
    };
  },
};
</script>
<style scoped>
.text-h5 {
  color: #111;
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: 700;
  line-height: 48px;
  text-align: center;
}
</style>
