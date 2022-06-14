<template>
  <v-list-item lines="three">
    <v-container>
      <v-row class="d-flex text-center justify-center margin-center">
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="loading"
        ></v-progress-circular>
      </v-row>
      <v-row v-if="!loading" @click="$router.push({ path: `/video/${id}` })">
        <v-col cols="3"
          ><img :src="src" alt="" style="height: 100px; width: 60px"
        /></v-col>
        <v-col cols="9">
          <v-list-item-header>
            <v-list-item-title>{{ title }}</v-list-item-title>
            <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
            <v-list-item-subtitle class="pt-2">{{ tag }}</v-list-item-subtitle>
          </v-list-item-header></v-col
        >
      </v-row>
    </v-container>
  </v-list-item>
</template>
<script>
import Movie from "@/api/movie";
export default {
  setup() {},
  data() {
    return {
      title: "加载中",
      description: "",
      tag: "",
      src: "",
      loading: true,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    id: function () {
      this.fetchData();
    },
  },
  props: {
    id: String,
  },
  methods: {
    async fetchData() {
      Movie.detail(this.id).then((res) => {
        Object.assign(this, res);
        this.loading = false;
      });
    },
  },
};
</script>
