<template>
  <v-container
    ><SearchWidget @idSearched="getId" />{{ this.id }}
    <MovieCard :id="id" />
  </v-container>
</template>
<script>
import SearchWidget from "@/components/SearchWidget.vue";
import MovieCard from "@/components/MovieCard.vue";
export default {
  components: { SearchWidget, MovieCard },
  data() {
    return {
      id: 343611,
    };
  },
  methods: {
    getId(val) {
      this.id = val;
    },
  },
};
</script>
