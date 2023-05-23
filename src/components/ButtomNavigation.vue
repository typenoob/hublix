<template>
  <v-bottom-navigation
    :value="activeBtn"
    color="primary"
    hide-on-scroll
    grow
    fluid
    app
    density="comfortable"
  >
    <v-btn
      v-for="(page, index) in pages"
      :key="index"
      :to="page.path"
      :value="page.name"
    >
      <v-icon :icon="page.icon" />
      {{ page.name }}
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
