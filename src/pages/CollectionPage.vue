<template>
  <v-container class="fill-height d-flex flex-column">
    <v-row
      ><v-col>
        <v-list v-model:opened="open">
          <SwipeLeftAction
            v-for="(collection, index) in collections"
            :key="index"
            :index="index"
            :name="collection.name"
            :enable="
              !open.includes(index) && !readOnly && !is_default(collection.id)
            "
            @onRemove="del($event)"
            @onRename="rename($event)"
          >
            <v-list-group active-color="primary" :value="index">
              <template v-slot:activator="{ props }">
                <v-list-item
                  class="list-item"
                  v-bind="props"
                  :prepend-icon="
                    open.includes(index)
                      ? 'mdi-folder-open-outline'
                      : 'mdi-folder-outline'
                  "
                  :title="collection.name"
                  :value="collection.name"
                ></v-list-item>
              </template>
              <MovieList
                v-for="(movie, index) in collection.movies"
                :key="index"
                :id="movie.id"
              />
            </v-list-group>
          </SwipeLeftAction>
        </v-list>
      </v-col>
    </v-row>

    <v-row class="align-end" v-show="!readOnly">
      <v-col align="end">
        <v-btn @click="create()" class="mx-2" icon="mdi-plus" color="indigo">
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MovieList from "@/components/MovieList.vue";
import collection from "@/api/collection";
import SwipeLeftAction from "@/components/SwipeLeftAction.vue";
export default {
  components: {
    MovieList,
    SwipeLeftAction,
  },
  created() {
    collection.readInfo();
  },
  data() {
    return {
      open: [],
    };
  },
  props: {
    readOnly: { type: Boolean, default: false },
  },
  computed: {
    collections() {
      return this.$store.state.collections;
    },
    is_default() {
      return (id) => this.$store.state.user.info.default_collection === id;
    },
  },
  methods: {
    create() {
      collection.create();
    },
    del(index) {
      collection.delete(this.collections[index].id);
    },
    rename(args) {
      this.collections[args.index].name = args.name;
      collection.update(this.collections[args.index].id, args.name);
    },
  },
};
</script>
<style>
.list-item {
  border-radius: 12px;
  background: #fafafa;
}
</style>
