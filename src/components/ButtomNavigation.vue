<template>
  <v-bottom-navigation :value="activeBtn" color="primary" app fluid>
    <v-btn
      v-for="(page, index) in pages"
      :key="index"
      :to="page.path"
      class="mr-6"
    >
      <span> {{ page.name }}</span>
      <v-icon>{{ page.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data() {
    return {
      activeBtn: 1,
    };
  },
  props: {
    pages: {
      type: Array,
    },
  },
};
</script>
