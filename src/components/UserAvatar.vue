<template>
  <v-avatar size="40" :color="name ? uniqolor(name[0]).color : 'white'">
    <img :src="`http://127.0.0.1:7001${path}`" v-if="path" />
    <span v-else class="white--text text-h5">{{
      name ? name[0] : "未知"
    }}</span>
  </v-avatar>
</template>
<script>
import uniqolor from "uniqolor";
export default {
  props: {
    id: {
      type: Number,
    },
    path: String,
    name: String,
  },
  methods: {
    uniqolor,
  },
};
</script>
