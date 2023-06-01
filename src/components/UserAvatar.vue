<template>
  <v-avatar size="40" :color="name ? uniqolor(name[0]).color : 'white'">
    <img :src="`http://egg.web-framework-ao2f.1627164863551065.cn-hangzhou.fc.devsapp.net${path}`" v-if="path" />
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
