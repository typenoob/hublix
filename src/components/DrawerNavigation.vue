<template>
  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
        title="John Leider"
        subtitle="john@vuetifyjs.com"
      >
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        active-color="primary"
        @click="item.action"
      >
        <v-divider v-if="item.divider"></v-divider>
        <template v-else>
          <v-list-item-avatar start>
            <v-icon :icon="item.icon"></v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </template>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2 d-flex justify-center">
        <v-btn color="primary">
          <v-icon left> mdi-logout-variant </v-icon> 退出账号
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      selectedItem: 1,
      items: [
        { text: "Real-Time", icon: "mdi-clock", action: this.click1 },
        { text: "Audience", icon: "mdi-account", action: this.click1 },
        { text: "Conversions", icon: "mdi-flag", action: this.click1 },
        {
          divider: true,
        },
        { text: "Real-Time", icon: "mdi-clock", action: this.click1 },
        { text: "Audience", icon: "mdi-account", action: this.click1 },
        { text: "Conversions", icon: "mdi-flag", action: this.click1 },
        {
          divider: true,
        },
      ],
    };
  },
  methods: {
    click1() {
      console.log(1);
    },
    changeDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
