<template>
  <v-container class="h-100" fluid>
    <v-col class="h-100 flex-column">
      <v-row
        ><v-img src="/logo.png" max-height="350" class="flex-row"></v-img
      ></v-row>
      <v-spacer></v-spacer>
      <v-row rows="2">
        <v-text-field
          append-icon="''"
          v-model="payload.username"
          label="用户名"
          prepend-icon="mdi-account"
        ></v-text-field>
      </v-row>
      <v-row rows="2">
        <v-text-field
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="payload.password"
          :type="showPassword ? 'text' : 'password'"
          label="密码"
          prepend-icon="mdi-lock"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-row>
      <v-row class="d-flex justify-center" rows="2">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn tile color="success" @click="login()"> 登录 </v-btn>
        <v-spacer></v-spacer>
        <v-btn tile color="info" @click="register()"> 注册 </v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>
    <v-snackbar v-model="snackbar.appear" :color="snackbar.color">
      {{ snackbar.msg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import User from "@/api/user.js";
export default {
  name: "LoginPage",

  components: {},

  data() {
    return {
      payload: {
        username: "",
        password: "",
      },
      showPassword: false,
      snackbar: { appear: false, color: "", msg: "" },
    };
  },
  methods: {
    login() {
      User.login(this.payload)
        .then(() => {
          Object.assign(this.snackbar, {
            appear: true,
            color: "success",
            msg: "登录成功",
          });
          this.$router.push("/home");
        })
        .catch(() =>
          Object.assign(this.snackbar, {
            appear: true,
            color: "error",
            msg: "登录失败",
          })
        );
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>
