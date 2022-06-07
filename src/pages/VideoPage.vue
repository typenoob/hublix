<template>
  <v-container>
    <v-alert v-if="unfinished" type="warning">功能还在建设中</v-alert>
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
  </v-container>
</template>
<script>
import Movie from "@/api/movie.js";
import CommentSection from "@/components/CommentSection.vue";
export default {
  components: { CommentSection },
  created() {
    Movie.detail(this.$route.params.id).then((res) => {
      Movie.trailerUrl(res.imdb_id).then((res) => {
        Object.assign(this, res);
      });
    });
  },
  data() {
    return {
      videoId: "11111",
      videoUrl: "https://www.youtube.com/embed/4ooUbNOLAz0",
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
        positive: 2,
        neutral: 1,
        negative: 0,
      },
      attitude: 1,
      likes: Movie.likes.read(this.$route.params.id),
    };
  },
  methods: {
    like() {
      Movie.likes.create(this.$route.params.id);
      this.likes = Movie.likes.read(this.$route.params.id);
      this.attitude++;
    },
    dislike() {
      Movie.likes.delete(this.$route.params.id);
      this.likes = Movie.likes.read(this.$route.params.id);
      this.attitude--;
    },
    share() {
      this.unfinished = true;
      setTimeout(() => {
        this.unfinished = false;
      }, 2000);
    },
    download() {
      this.unfinished = true;
      setTimeout(() => {
        this.unfinished = false;
      }, 2000);
    },
    addToCollections() {
      //TODO 保存至收藏夹
      console.log("addToCollections");
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
