<template>
  <v-row v-for="(comment, index) in comments" :key="index" class="py-2">
    <v-col cols="2">
      <UserAvatar :name="comment.name" :path="comment.avatar_url"
    /></v-col>
    <v-col class="text-subtitle-2" cols="8">
      <v-row>
        <v-col>{{ `${comment.name} · ${daysAgo(comment)}` }}</v-col></v-row
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
      <v-icon v-if="updating" @click="update(index)" icon="mdi-check" />
      <v-icon v-else @click="beforeUpdate(index)" icon="mdi-pencil" />

      <v-icon @click="del(index)" icon="mdi-delete" />
    </v-col>
    <v-divider />
  </v-row>
  <v-snackbar v-model="snackbar.appear" :color="snackbar.color">
    {{ snackbar.msg }}
  </v-snackbar>
</template>
<script>
import moment from "moment";
import autosize from "autosize";
import UserAvatar from "@/components/UserAvatar.vue";
import Movie from "@/api/movie";
export default {
  components: {
    UserAvatar,
  },
  setup() {
    moment.locale("zh-cn"); //设置中文
  },
  created() {
    this.$nextTick(() => {
      autosize(this.$refs.textarea); // 设置textarea高度自适应
    });
  },
  data() {
    return {
      updating: false,
      snackbar: { appear: false, color: "", msg: "" },
    };
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
  emits: ["onUpdate"],
  methods: {
    daysAgo(comment) {
      return moment(comment.date).add(15, "h").fromNow(); //需要转换一下时区
    },
    beforeUpdate(index) {
      this.updating = true;
      this.$nextTick(() => {
        this.$refs.textarea[index].select();
      });
    },
    async update(index) {
      await Movie.comment
        .update(this.comments[index].id, this.comments[index].content)
        .then(() =>
          Object.assign(this.snackbar, {
            appear: true,
            color: "success",
            msg: "评论更新成功",
          })
        )
        .catch((res) => {
          Object.assign(this.snackbar, {
            appear: true,
            color: "error",
            msg: res.response.data.err,
          });
        });
      this.$emit("onUpdate");
      this.updating = false;
    },
    async del(index) {
      await Movie.comment
        .delete(this.comments[index].id)
        .then(() =>
          Object.assign(this.snackbar, {
            appear: true,
            color: "success",
            msg: "评论删除成功",
          })
        )
        .catch((res) => {
          Object.assign(this.snackbar, {
            appear: true,
            color: "error",
            msg: res.response.data.err,
          });
        });
      this.$emit("onUpdate");
    },
  },
};
</script>
