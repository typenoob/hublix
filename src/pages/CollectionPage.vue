<template>
  <v-container class="fill-height d-flex flex-column">
    <v-row
      ><v-col>
        <v-list v-model:opened="open">
          <SwipeLeftAction
            v-for="(collection, index) in collections"
            :key="index"
            :index="index"
            :name="collection.path"
            :enable="!open.includes(index)"
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
                  :title="collection.path"
                  :value="collection.path"
                ></v-list-item>
              </template>
              <MovieList
                v-for="(movie, index) in collection.movies"
                :key="index"
                :title="movie.title"
                :description="movie.description"
                :classification="movie.classification"
              />
            </v-list-group>
          </SwipeLeftAction>
        </v-list>
      </v-col>
    </v-row>

    <v-row class="align-end"
      ><v-col align="end">
        <v-btn @click="crt" class="mx-2" icon="mdi-plus" color="indigo">
        </v-btn></v-col
    ></v-row>
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
  data() {
    return {
      open: [],
      collections: collection.readAll(),
    };
  },
  methods: {
    crt() {
      collection.create("新建收藏夹");
    },
    del(index) {
      collection.delete(index);
    },
    rename(args) {
      collection.update(args.index, args.name);
    },
  },
};
//文件夹
</script>
<style>
.list-item {
  border-radius: 12px;
  background: #fafafa;
}
</style>
