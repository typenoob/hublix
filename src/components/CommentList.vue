<template>
  <v-row v-for="(comment, index) in comments" :key="index" class="py-2">
    <v-col cols="2">
      <v-avatar>
        <v-img :src="comment.avatarUrl" :alt="comment.author"></v-img>
      </v-avatar>
    </v-col>
    <v-col class="text-subtitle-2" cols="8">
      <v-row>
        <v-col>{{ `${comment.author} · ${daysAgo(comment)}` }}</v-col></v-row
      >
      <v-row>
        <v-col>
          <div class="v-textarea">
            <textarea
              ref="textarea"
              name="commment"
              style="width: 100%"
              v-model="comment.content"
            >
            </textarea>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="1" class="d-flex flex-column justify-space-between">
      <v-icon @click="update()"> mdi-pencil </v-icon>
      <v-icon @click="del()"> mdi-delete </v-icon>
    </v-col>
    <v-divider />
  </v-row>
</template>
<script>
import moment from "moment";
import autosize from "autosize";
export default {
  setup() {
    moment.locale("zh-cn"); //设置中文
  },
  created() {
    this.$nextTick(() => {
      autosize(this.$refs.textarea); // 设置textarea高度自适应
    });
  },
  data() {
    return {};
  },
  watch: {
    comments: {
      handler: function () {
        this.$nextTick(() => {
          autosize(this.$refs.textarea); // 设置textarea高度自适应
        });
      },
      deep: true,
    },
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  methods: {
    daysAgo(comment) {
      return moment(comment.date).fromNow();
    },
    update() {
      //TODO update comment
    },
    del() {
      //TODO del comment
    },
  },
};
</script>
