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
        // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
        this.items = [];
      }
    },
  },
  methods: {
    remoteSearch(val) {
      this.isLoading = true;

      // Lazily load input items
      Movie
        .search(val)
        .then((res) => {
          if (res.data.results)
            this.items = res.data.results.map((element) => {
              return {
                title: element.title,
                id: element.id,
              };
            });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
