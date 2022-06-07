 <template>
  <v-text-field
    width="300"
    v-model="email"
    :rules="emailRules"
    label="电子邮箱"
    required
  ></v-text-field>

  <v-row class="justify-space-between">
    <v-col
      ><v-text-field v-model="code" label="邮件验证码"></v-text-field>
    </v-col>
    <v-col
      ><v-btn
        height="56%"
        color="primary"
        block
        elevation="2"
        @click="sendEmailCode"
        :disabled="send.timer > 0"
        type="primary"
      >
        {{ sendText }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Extern from "@/api/extern.js";
export default {
  data() {
    return {
      send: {
        timer: 0,
      },
      email: "",
      code: "",
      emailRules: [
        (v) => !!v || "电子邮箱不可以为空",
        (v) => /.+@.+\..+/.test(v) || "必须是有效的电子邮箱地址",
      ],
    };
  },
  computed: {
    sendText() {
      //时刻刷新的显示时间
      if (this.send.timer <= 0) {
        return "发送邮箱验证码";
      }
      return `${this.send.timer}s后发送邮箱验证码`;
    },
  },
  methods: {
    async sendEmailCode() {
      // 设置10秒内，按钮不能点击，前端判断条件send.timer>0
      await Extern.sendCode(this.email);
      this.send.timer = 10;
      this.timer = setInterval(() => {
        this.send.timer -= 1;
        if (this.send.timer === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
};
</script>
 
 
    