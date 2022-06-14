<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    v-model:search="inputChange"
    item-title="title"
    item-value="id"
    label="搜索电影..."
    no-data-text="没有找到相关电影"
  >
  </v-autocomplete>
</template>
<script>
import Movie from "@/api/movie.js";
export default {
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    inputChange: null,
    search: null,
    tab: null,
    value: null,
  }),
  emits: ["idSearched"],
  watch: {
    model(val) {
      this.$emit("idSearched", val);
    },

    inputChange(val) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (val) {
        this.timer = setTimeout(() => {
          this.remoteSearch(val);
        }, 300);
      } else {
        this.items = [];
      }
    },
  },
  methods: {
    remoteSearch(val) {
      this.isLoading = true;
      // Lazily load input items
      Movie.search(val)
        .then((res) => (this.items = res))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
