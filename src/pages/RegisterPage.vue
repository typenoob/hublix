<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="用户名"
        required
      ></v-text-field>

      <email-verify></email-verify>

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
  </v-container>
</template>
<script>
import EmailVerify from "@/components/EmailVerify.vue";
export default {
  data() {
    return {
      send: {
        timer: 0,
      },
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "用户名不可以为空",
        (v) => (v && v.length <= 10) || "用户名应该少于10个字符",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
  components: {
    EmailVerify,
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>