<template>
  <v-container
    ><SearchWidget @idSearched="getId" />
    <v-card class="pt-4 px-2 mb-10" flat>
      <v-row class=""
        ><v-col>搜索历史</v-col
        ><v-col class="d-flex justify-end" @click="clearHistory()" style=""
          >清空</v-col
        ></v-row
      >
      <v-chip
        class="ma-2"
        v-for="(item, index) in history"
        :key="index"
        @click="id = item.id"
        x-small
      >
        {{ item.name }}
      </v-chip>
    </v-card>
    <MovieCard :id="id" />
  </v-container>
</template>
<script>
import SearchWidget from "@/components/SearchWidget.vue";
import MovieCard from "@/components/MovieCard.vue";
import Movie from "@/api/movie";
export default {
  components: { SearchWidget, MovieCard },
  created() {
    this.fetchData();
  },
  data() {
    return {
      id: 343611,
      history: [],
    };
  },
  methods: {
    async getId(val) {
      this.id = val;
      await Movie.history.onSearched(val);
      this.fetchData();
    },
    fetchData() {
      Movie.history.readSearched().then((res) => (this.history = res));
    },
    async clearHistory() {
      await Movie.history.clear();
      this.fetchData();
    },
  },
};
</script>
