<template>
  <v-container class="h-100">
    <v-row>{{ res }}</v-row></v-container
  >
</template>
<script>
import User from "@/api/user.js";
export default {
  name: "HomePage",

  components: {},
  created() {
    User.index().then((res) => {
      this.res = res;
      console.log(res);
    });
  },
  data() {
    return {
      res: "",
    };
  },
};
</script>
