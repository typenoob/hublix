<template>
  <v-card
    :elevation="elevation"
    @touchstart="this.elevation = 12"
    @touchend="this.elevation = 6"
    class="mx-auto"
    density="compact"
    :max-width="width"
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
        class="ml-n2"
        size="x-small"
        :color="like ? 'red' : 'blue'"
        icon="mdi-heart"
        @click="like = !like"
      ></v-btn>

      <v-btn
        size="x-small"
        class="ml-n2"
        color="surface-variant"
        icon="mdi-share-variant"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Movie from "@/api/movie.js";
import { useDisplay } from "vuetify";
export default {
  mounted() {
    this.fetchData();
  },
  computed: {
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
    fetchData() {
      Movie.detail(this.id).then((res) => {
        Object.assign(this, res);
      });
    },
  },
};
</script>
