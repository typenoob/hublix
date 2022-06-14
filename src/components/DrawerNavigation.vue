<template>
  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item>
        <v-list-item-avatar start left prepend>
          <v-badge
            bordered
            bottom
            :color="user.isActive ? 'green accent-4' : 'grey'"
            dot
            offset-x="5"
            offset-y="28"
          >
            <UserAvatar
              :name="user.info.nickname"
              :path="user.info.avatar_url"
            />
          </v-badge>
        </v-list-item-avatar>
        <v-list-item
          :title="user.info.nickname"
          :subtitle="user.info.email"
          class="px-0"
        >
        </v-list-item>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-row class="d-flex justify-end align-center mt-2">
      <v-col class="pl-10" style="font-size: 13px"
        ><div style="width: 75px">我的好友</div>
      </v-col>
      <v-col cols="3">
        <v-icon
          icon="mdi-refresh"
          @click="refresh"
          class="mr-5"
        ></v-icon></v-col
    ></v-row>
    <v-row
      v-for="(friend, index) in user.friends.list"
      :key="index"
      class="my-2"
    >
      <v-col cols="2" class="d-flex align-center justify-end pa-0"
        ><v-icon v-show="friend.is_top" icon="mdi-pin-outline" />
      </v-col>
      <v-col cols="2" class="d-flex align-center justify-center">
        <v-badge
          bordered
          bottom
          dot
          offset-x="5"
          offset-y="28"
          :color="friend.is_active ? 'green accent-4' : 'grey'"
        >
          <UserAvatar
            :path="friend.avatar_url"
            :name="friend.nickname"
          /> </v-badge
      ></v-col>
      <v-col cols="5" class="d-flex align-center">{{ friend.nickname }}</v-col>
      <v-col cols="3" class="d-flex align-center"
        ><v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              size="x-small"
              icon="mdi-dots-vertical "
            >
            </v-btn>
          </template>
          <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            scrollable
          >
            <template v-slot:activator="{ props }">
              <v-list>
                <v-list-item v-for="(action, i) in actions" :key="i">
                  <v-list-item-title
                    @click="action.click(user.friends.list[index].id)"
                    v-bind="i == 0 ? props : ''"
                    >{{
                      user.friends.list[index].is_top && i == 2
                        ? "取消置顶"
                        : action.name
                    }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </template>
            <v-card>
              <v-container>
                <MovieList
                  v-for="(movie, index) in friend_collection"
                  :key="index"
                  :id="movie.movie_id"
                />
                <v-row v-show="!friend_collection.length">
                  <v-col cols="4" class="d-flex justify-center"
                    ><v-icon icon="mdi-emoticon-sad-outline"
                  /></v-col>
                  <v-col>空空如也</v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
        </v-menu>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <template v-slot:activator="{ props }">
      <v-btn
        color="primary"
        v-bind="props"
        size="x-small"
        icon="mdi-dots-vertical "
      >
      </v-btn>
    </template>
    <v-list nav dense>
      <v-dialog
        transition="dialog-bottom-transition"
        v-for="(item, index) in items"
        :key="index"
        scrollable
      >
        <template v-slot:default="{ props }">
          <v-card :value="item" v-bind="props" max-height="500"
            ><component v-bind:is="item.dialog"></component
          ></v-card>
        </template>
        <template v-slot:activator="{ props }">
          <v-list-item :value="item" active-color="primary" v-bind="props">
            <v-list-item-avatar start>
              <v-icon :icon="item.icon" />
            </v-list-item-avatar>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-dialog>
    </v-list>
    <v-divider></v-divider>
    <template v-slot:append>
      <div class="pa-2 d-flex justify-center">
        <v-btn color="primary" @click="logout()">
          <v-icon left icon="mdi-logout-variant" /> 退出账号
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import MovieList from "@/components/MovieList.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import User from "@/api/user";
import Collection from "@/api/collection";
import AddFriend from "@/components/dialog/AddFriend.vue";
import EditAvatar from "@/components/dialog/EditAvatar.vue";
import ShowHistroy from "@/components/dialog/ShowHistory.vue";
import ShowApply from "@/components/dialog/ShowApply.vue";
export default {
  components: {
    MovieList,
    UserAvatar,
    AddFriend,
    EditAvatar,
    ShowHistroy,
    ShowApply,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    User.friend.readInfo();
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      items: [
        {
          text: "添加好友",
          icon: "mdi-account-multiple-plus-outline",
          dialog: "AddFriend",
        },
        {
          text: "查看申请",
          icon: "mdi-message-outline",
          dialog: "ShowApply",
        },
        {
          text: "修改头像",
          icon: "mdi-image-edit-outline",
          dialog: "EditAvatar",
        },
        {
          text: "历史记录",
          icon: "mdi-history",
          dialog: "ShowHistroy",
        },
      ],
      actions: [
        {
          name: "查看收藏",
          click: this.getFriendMovies,
        },
        {
          name: "删除好友",
          click: this.deleteFriend,
        },
        {
          name: "设为置顶",
          click: this.pinTop,
        },
      ],
      friend_collection: [],
    };
  },
  methods: {
    logout: User.logout,
    changeDrawer() {
      this.drawer = !this.drawer;
    },
    deleteFriend(id) {
      User.friend.deleteFriend(id);
    },
    pinTop(id) {
      User.friend.pinTop(id);
    },
    async getFriendMovies(id) {
      this.friend_collection = await Collection.getFriendMovies(id);
    },
    refresh() {
      User.friend.readInfo();
    },
  },
};
</script>
