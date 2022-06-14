<template>
  <v-container>
    <v-list v-for="(friend, index) in friends" :key="index">
      <v-list-item>
        <UserAvatar
          class="mr-4"
          :path="friend.avatar"
          :name="friend.nickname"
        />
        <v-list-item width="100" :title="friend.nickname" class="px-0">
        </v-list-item>
        <v-list-item-action>
          <v-icon @click="accept(index)" icon="mdi-check" class="mr-2" />
          <v-icon @click="reject(index)" icon="mdi-close"
        /></v-list-item-action>
      </v-list-item>
    </v-list>
    <v-row v-show="!friends.length">
      <v-col cols="2" class="d-flex justify-center"
        ><v-icon icon="mdi-emoticon-sad-outline"
      /></v-col>
      <v-col>没有收到好友申请</v-col>
    </v-row>
  </v-container>
</template>
<script>
import User from "@/api/user";
import UserAvatar from "@/components/UserAvatar.vue";
export default {
  components: { UserAvatar },
  created() {
    User.friend.readInfo();
  },
  computed: {
    friends() {
      return this.$store.state.user.friends.apply;
    },
  },
  data() {
    return {};
  },
  methods: {
    accept(index) {
      User.friend.acceptApply(this.friends[index].id);
    },
    reject(index) {
      User.friend.rejectApply(this.friends[index].id);
    },
  },
};
</script>
