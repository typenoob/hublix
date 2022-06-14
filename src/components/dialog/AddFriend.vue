<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-text-field
          v-model="name"
          variant="outlined"
          label="好友用户名"
          style="width: 120px"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center"
        ><v-btn color="primary" @click="addFriend()">发送申请</v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.appear" :color="snackbar.color"
      >{{ snackbar.msg }}
    </v-snackbar>
  </v-container>
</template>
<script>
import User from "@/api/user.js";
export default {
  components: {},
  data() {
    return {
      name: "",
      snackbar: { appear: false, color: "", msg: "" },
    };
  },
  methods: {
    async addFriend() {
      const result = await User.friend.addFriend(this.name);
      if (result.updateSuccess)
        Object.assign(this.snackbar, {
          appear: true,
          color: "success",
          msg: "申请发送成功",
        });
      else
        Object.assign(this.snackbar, {
          appear: true,
          color: "warning",
          msg: result.err,
        });
    },
  },
};
</script>
