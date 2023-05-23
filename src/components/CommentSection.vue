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
            <v-icon @click="sendComment()" icon="mdi-send" />
          </template>
        </v-textarea>
      </v-col>
    </v-row>
    <v-row style="overflow-y: auto; height: 500px">
      <v-col
        ><CommentList :comments="comments" @onUpdate="readComment()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommentList from "@/components/CommentList.vue";
import Movie from "@/api/movie";
export default {
  components: { CommentList },
  created() {
    this.readComment();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      comment: "",
      comments: [],
    };
  },
  methods: {
    async sendComment() {
      await Movie.comment.create(this.id, this.comment);
      this.comment = "";
      this.readComment();
    },
    async readComment() {
      this.comments = await Movie.comment.readAll(this.id);
    },
  },
};
</script>
<style></style>
