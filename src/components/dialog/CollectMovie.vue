<template>
  <v-dialog v-model="show">
    <v-card height="200" class="d-flex justify-space-around">
      <v-card-title>选择收藏夹</v-card-title>
      <v-card-text>
        <select
          name="选择收藏夹"
          style="border-radius: 5px; box-shadow: 0 0 5px #ccc"
          v-model="selectedCollection"
        >
          <option
            v-for="(collection, index) in collections"
            :value="collection.id"
            :key="index"
          >
            {{ collection.name }}
          </option>
        </select></v-card-text
      >

      <v-card-actions style="c">
        <v-btn color="primary" flat @click.stop="add()">添加</v-btn>
        <v-btn color="primary" flat @click.stop="show = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar.appear" :color="snackbar.color">
    {{ snackbar.msg }}
  </v-snackbar>
</template>

<script>
import Collection from "@/api/collection";
export default {
  props: ["visible"],
  computed: {
    id() {
      return this.$route.params.id;
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  data() {
    return {
      collections: ["1", "2"],
      selectedCollection: "",
      snackbar: { appear: false, color: "", msg: "" },
    };
  },
  emits: ["close"],
  methods: {
    add() {
      Collection.addMovie(this.selectedCollection, this.id)
        .then(() => {
          this.show = false;
          Object.assign(this.snackbar, {
            appear: true,
            color: "success",
            msg: "添加成功",
          });
        })
        .catch(() =>
          Object.assign(this.snackbar, {
            appear: true,
            color: "error",
            msg: "添加失败",
          })
        );
    },
  },
  async created() {
    this.collections = await Collection.getAllCollections();
  },
};
</script>
<style scoped>
select {
  width: 100%;
  height: 40px;
  text-align: center;
}
</style>
