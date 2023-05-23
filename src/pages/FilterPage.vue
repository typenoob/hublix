<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-select
          v-if="visible"
          v-model="genresSelect"
          :items="genres.map((genre) => genre.name)"
          label="类型"
          variant="plain"
        >
        </v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          dense
          height="30px"
          loader-height="1"
          v-model="year"
          :items="['全部'].concat(years)"
          label="发行年份"
          variant="plain"
        ></v-select
      ></v-col>
      <v-col cols="3">
        <v-select
          v-model="sort"
          :items="sorts.map((sort) => sort.label)"
          label="排序"
          variant="plain"
        ></v-select
      ></v-col>
      <v-col cols="3">
        <v-select
          v-model="perPage"
          :items="['2', '4', '6', '8']"
          attach
          label="每页显示"
          variant="plain"
        ></v-select
      ></v-col>
    </v-row>
    <v-row class="mt-n9 mb-5">
      <v-col v-for="id in currentIds" :key="id" cols="6"
        ><MovieCard :id="id"
      /></v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        rounded
        density="compact"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        total-visible="6"
        :length="
          (totalResults - 1) / perPage + 1 > 999
            ? 999
            : parseInt((totalResults - 1) / perPage + 1)
        "
      ></v-pagination>
    </div>
  </v-container>
</template>
<script>
import Movie from "@/api/movie.js";
import MovieCard from "@/components/MovieCard";
export default {
  setup() {},
  components: { MovieCard },
  created() {
    Movie.genres().then((res) => {
      this.genres.push(...res);
      console.log(this.genres);
    });
    this.fetchMovie();
  },
  data() {
    return {
      visible: true,
      totalResults: 0,
      genres: [{ name: "全部" }],
      genresSelect: "全部",
      sorts: [
        { label: "人气", name: "popularity" },
        { label: "发布日期", name: "release_date" },
        { label: "盈利", name: "revenue" },
        { label: "平均分数", name: "vote_average" },
        { label: "评分次数", name: "vote_count" },
      ],
      sort: "人气",
      ids: [],
      page: 1,
      perPage: "4",
      fetchPage: 1,
      year: "全部",
    };
  },
  computed: {
    currentIds() {
      return this.ids.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
    years() {
      return Array.from({ length: 20 }, (v, k) =>
        (-k + new Date().getFullYear()).toString()
      );
    },
    genresId() {
      return this.genres.find((genre) => genre.name === this.genresSelect)?.id;
    },
    sortName() {
      return this.sorts.find((sort) => sort.label === this.sort).name;
    },
    filter() {
      const { genresSelect, year, sort } = this;
      return { genresSelect, year, sort };
    },
  },
  watch: {
    page(val) {
      if (val * this.perPage >= this.ids.length) {
        this.fetchPage = parseInt((val * this.perPage - 1) / 20) + 1;
        this.fetchMovie();
      }
    },
    genresSelect(val) {
      if (val.length == 0) {
        this.visible = true;
      }
      this.fetchPage = 1;
      this.ids = [];
      this.fetchMovie();
    },
    year() {
      this.fetchPage = 1;
      this.ids = [];
      this.fetchMovie();
    },
    filter: {
      handler() {
        this.fetchPage = 1;
        this.ids = [];
        this.fetchMovie();
      },
      deep: true,
    },
  },
  methods: {
    fetchMovie() {
      Movie.filter(
        this.fetchPage,
        this.year,
        this.genresId,
        this.sortName
      ).then((res) => {
        while (this.ids.length < this.fetchPage * 20) {
          this.ids.push(null);
        }
        this.ids.splice((this.fetchPage - 1) * 20, 20, ...res.list);
        this.totalResults = res.totalResults;
      });
    },
  },
};
</script>
