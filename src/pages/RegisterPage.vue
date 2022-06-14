<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="payload.username"
        :counter="10"
        :rules="nameRules"
        label="用户名"
        required
      ></v-text-field>
      <v-text-field
        v-model="payload.password"
        :counter="15"
        :rules="passwordRules"
        label="密码"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :counter="15"
        :rules="confirmRules"
        label="再次输入密码"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        required
      ></v-text-field>
      <v-text-field
        v-model="payload.nickname"
        :rules="nickNameRules"
        label="昵称"
        required
      ></v-text-field>

      <email-verify ref="email"></email-verify>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || '必须同意以继续!']"
        label="我已阅读并同意相关服务条款和隐私政策"
        required
      ></v-checkbox>
      <v-row class="justify-space-between">
        <v-col align="center">
          <v-btn
            size="x-large"
            :disabled="!valid"
            color="success"
            @click="validate"
          >
            注册
          </v-btn>
        </v-col>
        <v-col align="center">
          <v-btn size="x-large" color="error" @click="reset"> 重置 </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar v-model="success" color="success"> 注册成功 </v-snackbar>
    <v-snackbar v-model="error" color="error">
      {{ msg }}
    </v-snackbar>
  </v-container>
</template>
<script>
import EmailVerify from "@/components/EmailVerify.vue";
import Extern from "@/api/extern.js";
import User from "@/api/user";
export default {
  data() {
    return {
      send: {
        timer: 0,
      },
      password: "",
      showPassword: false,
      success: false, //注册成功
      error: false,
      msg: "", //注册失败信息
      bytes: require("utf8-length"),
      valid: true,
      nameRules: [
        (v) => !!v || "用户名不可以为空",
        (v) =>
          /^[a-zA-Z0-9_-]*$/.test(v) ||
          "用户名只能包含字母、数字、下划线和减号",

        (v) => (v && v.length <= 10) || "用户名不可以超过10个字符",
      ],
      passwordRules: [
        (v) => !!v || "密码不可以为空",
        (v) => (v && v.length >= 8) || "密码至少8个字符",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/.test(v) ||
          "密码只能包含字母和数字，至少一个字母和一个数字",
        (v) => (v && v.length <= 15) || "密码不可以超过15个字符",
      ],
      confirmRules: [(v) => v == this.payload.password || "两次密码不一致"],
      nickNameRules: [
        (v) => !!v || "昵称不可以为空",
        (v) => this.bytes(v) <= 15 || "昵称太长",
      ],
      checkbox: false,
      payload: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  components: {
    EmailVerify,
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      Extern.verifyCode(this.$refs.email.email, this.$refs.email.code).then(
        (res) => {
          if (res) {
            User.register(
              Object.assign(this.payload, { email: this.$refs.email.email })
            ).then((res) => {
              if (res.updateSuccess) this.success = true;
              else {
                this.msg = res.err;
                this.error = true;
              }
            });
          } else {
            this.msg = "邮箱验证码不正确";
            this.error = true;
          }
        }
      );
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
