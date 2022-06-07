<template>
  <v-container>
    <v-row>
      <v-col>
        <v-textarea
          v-model="comment"
          auto-grow
          variant="outlined"
          rows="1"
          row-height="15"
          placeholder="添加评论..."
        >
          <template v-slot:append>
            <v-icon @click="sendComment()">mdi-send</v-icon>
          </template>
        </v-textarea>
      </v-col>
    </v-row>
    <v-row style="overflow-y: auto; height: 500px">
      <v-col><CommentList :comments="comments" /> </v-col>
    </v-row>
  </v-container>
</template>

<script>
//TODO send comments to vuex
import CommentList from "@/components/CommentList.vue";
import Movie from "@/api/movie";
export default {
  components: { CommentList },
  data() {
    return {
      comment: "",
      comments: Movie.comment.readAll(this.$route.params.id),
    };
  },
  methods: {
    sendComment() {
      console.log(1);
      Movie.comment.create(this.$route.params.id, this.comment);
      this.comment = "";
    },
  },
};
</script>
<style></style>
