<template>
  <v-card
    :elevation="elevation"
    @touchstart="this.elevation = 12"
    @touchend="this.elevation = 6"
    class="mx-auto"
    density="compact"
    :max-width="width"
    style="position: relative"
  >
    <v-img
      @click="$router.push({ path: `/video/${id}` })"
      class="white--text align-end"
      :src="src"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      cover
    >
      <v-card-title class="text-white">{{ title }}</v-card-title>
    </v-img>
    <v-card-actions>
      <v-rating
        readonly
        v-model="rating"
        background-color="white"
        color="yellow accent-4"
        density="compact"
        half-increments
        hover
        size="small"
      ></v-rating>
      <v-spacer></v-spacer>
      <v-btn
        :style="`position: absolute; right: ${right[0]}px; bottom: 8px`"
        size="x-small"
        :color="is_collected ? 'yellow' : '#424242'"
        :icon="is_collected ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
        @click="is_collected ? deleteMovie(id) : addMovie(collection_id, id)"
      ></v-btn>

      <v-btn
        size="x-small"
        :style="`position: absolute; right: ${right[1]}px; bottom: 8px`"
        color="surface-variant"
        icon="mdi-share-variant"
        @click="this.$store.commit('alertUnfinished')"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
//TODO 添加到默认收藏夹
import Movie from "@/api/movie.js";
import Collection from "@/api/collection.js";
import { useDisplay } from "vuetify";
export default {
  created() {
    this.readInfo();
    this.fetchData();
  },
  computed: {
    collection_id() {
      return this.$store.state.user.info.default_collection;
    },
    is_collected() {
      const movies = this.$store.state.collections.reduce((acc, cur) => {
        return acc.concat(cur.movies.map((movie) => movie.id));
      }, []);
      return movies.includes(this.id.toString());
    },
    width() {
      const { name } = useDisplay();
      switch (name.value) {
        case "xs":
          return 160;
        case "sm":
          return 250;
        case "md":
          return 350;
        case "lg":
          return 450;
        case "xl":
          return 550;
      }
      return 0;
    },
    right() {
      const { name } = useDisplay();
      switch (name.value) {
        case "xs":
          return [20, 0];
        case "sm":
          return [80, 40];
        case "md":
          return [120, 60];
        case "lg":
          return [180, 100];
        case "xl":
          return [240, 160];
      }
      return 0;
    },
  },
  data() {
    return {
      elevation: 6,
      title: "标题",
      src: "",
      rating: 5,
      like: false,
    };
  },
  watch: {
    id: function () {
      this.fetchData();
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async fetchData() {
      Movie.detail(this.id).then((res) => {
        Object.assign(this, res);
      });
    },
    addMovie: Collection.addMovie,
    deleteMovie: Collection.deleteMovie,
    readInfo: Collection.readInfo,
  },
};
</script>
