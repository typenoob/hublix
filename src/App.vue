<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>
    <v-toolbar image="/appbar.png">
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>云忆</v-toolbar-title>
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
    </v-toolbar>
    <!-- 根据应用组件来调整你的内容 -->
    <v-main> <router-view></router-view> </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    console.log(this.$store.state.user.isLogin);
    if (this.$store.state.user.isLogin) {
      this.$router.push("/home");
    } else this.$router.push("/login");
  },
  components: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },

  data: () => ({
    //
  }),
};
</script>