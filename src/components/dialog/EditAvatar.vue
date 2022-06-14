<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-center align-center">
      <v-col>
        <v-file-input
          accept="image/*"
          show-size
          variant="outlined"
          style="width: 200px"
          label="选择头像"
          prepend-icon="mdi-image-outline"
          v-model="currentFile"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <v-btn color="success" dark small @click="upload">
          上传
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.appear" :color="snackbar.color">
      {{ snackbar.msg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import User from "@/api/user";
export default {
  data() {
    return {
      currentFile: undefined,
      snackbar: {
        appear: false,
        color: "",
        msg: "",
      },
    };
  },
  methods: {
    upload() {
      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }
      User.uploadAvatar(this.currentFile[0])
        .then(() => {
          Object.assign(this.snackbar, {
            appear: true,
            color: "success",
            msg: "上传成功",
          });
        })
        .catch(() => {
          Object.assign(this.snackbar, {
            appear: true,
            color: "error",
            msg: "上传失败",
          });
          this.currentFile = undefined;
        });
    },
  },
};
</script>
