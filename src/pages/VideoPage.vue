<template>
  <v-container>
    <v-responsive :aspect-ratio="16 / 9">
      <iframe
        :src="videoUrl"
        style="position: absolute; width: 100%; height: 100%; top: 0"
      >
      </iframe>
    </v-responsive>
    <v-row class="mt-2">
      <v-col class="d-flex justify-center align-center flex-column">
        <v-icon
          v-if="attitude == attitudeEnum.positive"
          color="red"
          @click="dislike()"
        >
          mdi-thumb-up
        </v-icon>

        <v-icon v-else @click="like()"> mdi-thumb-up-outline </v-icon>
        {{ likes }}
      </v-col>
      <v-col class="d-flex justify-center align-center flex-column">
        <v-icon
          v-if="attitude == attitudeEnum.negative"
          color="red"
          @click="like()"
        >
          mdi-thumb-down
        </v-icon>

        <v-icon v-else @click="dislike()"> mdi-thumb-down-outline </v-icon>
        踩
      </v-col>
      <v-col
        v-for="(button, index) in buttons"
        :key="index"
        class="d-flex justify-center align-center flex-column"
      >
        <v-icon @click="button.action()">
          {{ button.icon }}
        </v-icon>
        {{ button.text }}
      </v-col>
    </v-row>
    <CommentSection />
    <CollectMovie :visible="showDialog" @close="showDialog = false" />
  </v-container>
</template>
<script>
import Movie from "@/api/movie.js";
import CommentSection from "@/components/CommentSection.vue";
import CollectMovie from "@/components/dialog/CollectMovie.vue";
export default {
  components: { CommentSection, CollectMovie },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.fetchData();
    Movie.detail(this.id).then((res) => {
      Movie.trailerUrl(res.imdbId).then((res) => {
        Object.assign(this, res);
      });
    });
  },
  mounted() {
    Movie.history.onVisited(this.id);
  },

  data() {
    return {
      showDialog: false,
      videoId: "11111",
      videoUrl: "",
      buttons: [
        { icon: "mdi-share-outline", action: this.share, text: "分享" },
        { icon: "mdi-download-outline", action: this.download, text: "下载" },
        {
          icon: "mdi-plus-box-multiple-outline",
          action: this.addToCollections,
          text: "保存",
        },
      ],
      unfinished: false,
      attitudeEnum: {
        positive: 1,
        neutral: 0,
        negative: -1,
      },
      attitude: 0,
      likes: 0,
    };
  },
  methods: {
    async fetchData() {
      this.likes = await Movie.likes(this.id);
      this.attitude = await Movie.attitude.read(this.id);
    },
    async like() {
      await Movie.attitude.like(this.id);
      this.fetchData();
    },
    async dislike() {
      await Movie.attitude.dislike(this.id);
      this.fetchData();
    },
    share() {
      this.$store.commit("alertUnfinished");
    },
    download() {
      this.$store.commit("alertUnfinished");
    },
    addToCollections() {
      this.showDialog = true;
    },
  },
};
</script>
<style scoped>
.v-alert {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>
