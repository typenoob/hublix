<template>
  <v-app>
    <v-app-bar app image="/appbar.png">
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-btn
        icon
        v-if="isTopLevelPage"
        @click.stop="this.$refs.drawer.changeDrawer()"
        v-show="user.isLogin"
      >
        <v-badge
          bordered
          bottom
          :color="user.isActive ? 'green accent-4' : 'grey'"
          dot
          offset-x="5"
          offset-y="28"
        >
          <UserAvatar :name="user.info.nickname" :path="user.info.avatar_url" />
        </v-badge>
      </v-btn>
      <v-btn icon v-else @click="goBack" v-show="user.isLogin">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-app-bar-title class="ml-5">随意影视</v-app-bar-title>
      <v-btn icon to="/search" v-show="user.isLogin">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <DrawerNavigation v-if="user.isLogin" ref="drawer" />
    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <router-view v-slot="{ Component }">
        <v-slide-x-transition>
          <component :is="Component" />
        </v-slide-x-transition>
      </router-view>
    </v-main>
    <ButtomNavigation v-if="user.isLogin" :pages="topLevelPages" />
    <v-snackbar v-model="this.user.expired" color="warning">
      登录过期，请重新登录
    </v-snackbar>
    <v-alert v-show="this.$store.state.unfinished" type="warning"
      >功能还在建设中</v-alert
    >
  </v-app>
</template>

<script>
import ButtomNavigation from "@/components/ButtomNavigation.vue";
import DrawerNavigation from "@/components/DrawerNavigation.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import Extern from "@/api/extern";
import User from "@/api/user";
export default {
  name: "App",
  components: { ButtomNavigation, DrawerNavigation, UserAvatar },
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
    // this.user.isLogin = true;
    if (this.user.isLogin) {
      this.$router.push("/home");
    } else this.$router.push("/login");
    this.heartbeat();
    this.timer = setInterval(this.heartbeat, 60 * 1000); //设置定时器
  },
  data() {
    return {
      timer: "",
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
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    upload: Extern.upload,
    async heartbeat() {
      if (this.user.isLogin) {
        await User.postActive();
        User.readActive(this.user.info.id);
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss">
.v-alert {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>
