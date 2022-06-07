<template>
  <v-list-item
    prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
    lines="three"
  >
    <v-list-item-header>
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ classification }}</v-list-item-subtitle>
    </v-list-item-header>
  </v-list-item>
</template>
<script>
export default {
  setup() {},
  data() {
    return {};
  },
  props: {
    title: String,
    description: String,
    classification: String,
  },
};
</script>
