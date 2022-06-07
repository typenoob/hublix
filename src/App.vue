<template>
  <v-app>
    <v-toolbar image="/appbar.png" app>
      <v-btn
        icon
        v-if="isTopLevelPage"
        @click.stop="this.$refs.drawer.changeDrawer()"
      >
        <v-avatar>
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          ></v-img>
        </v-avatar>
      </v-btn>
      <v-btn icon v-else @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-5">随意影视</v-toolbar-title>
      <v-btn icon to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
    </v-toolbar>
    <DrawerNavigation ref="drawer" />
    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <router-view v-slot="{ Component }">
        <v-slide-x-transition>
          <component :is="Component" />
        </v-slide-x-transition>
      </router-view>
    </v-main>
    <ButtomNavigation :pages="topLevelPages" />
  </v-app>
</template>

<script>
import ButtomNavigation from "@/components/ButtomNavigation.vue";
import DrawerNavigation from "@/components/DrawerNavigation.vue";
export default {
  name: "App",
  components: { ButtomNavigation, DrawerNavigation },
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
    if (this.$store.state.user.isLogin) {
      this.$router.push("/home");
    } else this.$router.push("/login");
    //对video界面进行开发
    this.$router.push("/video/343611");
  },
  data() {
    return {
      drawer: false,
      group: null,
      topLevelPages: [
        {
          name: "主页",
          path: "/home",
          icon: "mdi-home",
        },
        {
          name: "收藏",
          path: "/collection",
          icon: "mdi-heart",
        },
        {
          name: "筛选",
          path: "/filter",
          icon: "mdi-filter",
        },
      ],
    };
  },
  computed: {
    isTopLevelPage() {
      return this.topLevelPages
        .map((item) => item.path)
        .includes(this.$route.path);
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
