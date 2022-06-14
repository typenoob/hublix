<template>
  <div wrap style="margin-bottom: 20px">
    <div
      class="slider-item"
      v-show="enable && !renaming"
      :style="`height:${height}px;`"
    >
      <div
        class="content"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        :style="deleteSlider"
      >
        <div ref="slot"><slot></slot></div>
        <v-icon
          @click="remove"
          class="remove"
          :style="`line-height:${height}px;right:${-DELBTNWIDTH / 2}px`"
          icon="mdi-delete"
        />
        <v-icon
          @click="renaming = true"
          class="rename"
          :style="`line-height:${height}px;right:${-DELBTNWIDTH}px`"
          icon="mdi-pencil"
        />
      </div>
    </div>
    <slot v-if="!enable"></slot>
    <v-list-item
      class="list-item"
      v-show="renaming"
      :prepend-icon="'mdi-folder-outline'"
    >
      <div style="width: 100%; display: flex">
        <input
          onfocus="this.select()"
          type="text"
          ref="input"
          style="flex: 1; outline: none"
          v-model="newName"
        />
        <v-icon @click="rename" icon="mdi-check" />
        <v-icon @click="renaming = false" end icon="mdi-close" /></div
    ></v-list-item>
  </div>
</template>
<script>
// 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
const DELBTNWIDTH = 120;
export default {
  data() {
    return {
      startX: 0, // 开始pos
      endX: 0, // 结束pos
      moveX: 0, // 滑动时的pos
      disX: 0, // 滑动距离
      deleteSlider: "transform:translateX(0px)",
      DELBTNWIDTH: DELBTNWIDTH,
      renaming: false,
      height: 0,
      width: 0,
      newName: this.name,
    };
  },
  mounted() {
    this.height = this.$refs.slot.clientHeight;
    this.width = this.$refs.slot.clientWidth;
  },
  emits: ["onRemove", "onRename"],
  watch: {
    renaming(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.input.select();
        });
      }
    },
  },
  methods: {
    remove() {
      this.$emit("onRemove", this.index);
    },
    rename() {
      this.$emit("onRename", { index: this.index, name: this.newName });
      this.renaming = false;
    },
    touchStart(timestamp, ev) {
      ev = ev || event;
      this.currSliderTimestamp = timestamp;
      this.startX = 0;
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
      }
    },
    touchMove(timestamp, ev) {
      ev = ev || event;
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX;
        //实时滑动距离，和上一次滑动做个衔接。防止第二次触发的时候，位置不对的问题
        this.disX = this.startX - this.moveX + this.disX;
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX > 0) {
          if (this.disX < 100) {
            this.deleteSlider = "transform:translateX(-" + this.disX + "px)";
          } else {
            this.deleteSlider = "transform:translateX(-100px)";
          }
        } else {
          if (this.disX < -60) {
            this.deleteSlider = "transform:translateX(60px)";
          } else {
            this.deleteSlider =
              "transform:translateX(" + Math.abs(this.disX) + "px)";
          }
        }
      }
    },
    touchEnd() {
      //滑动完成后，滑块应该在的位置
      if (this.disX < 100) {
        this.deleteSlider = "transform:translateX(0px)";
        this.disX = 0;
      } else {
        this.deleteSlider = "transform:translateX(-" + DELBTNWIDTH + "px)";
        this.disX = 60;
      }
    },
  },
  props: {
    enable: Boolean, //是否可以滑动
    index: Number,
    name: String,
  },
};
</script>
<style>
.slider-item {
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
}

.content {
  position: absolute;
  min-width: 100%;
  height: 100%;
  box-sizing: normal-box;
  position: relative;
  transition-property: all;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0, 0.85, 0.72, 0.86);
  transition-delay: 0s;
}

.remove {
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  background: #fe5ba8;
  text-align: center;
  vertical-align: middle;
  font-size: 15px;
  color: #ffffff;
}
.rename {
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  background: blue;
  text-align: center;
  vertical-align: middle;
  font-size: 15px;
  color: #ffffff;
}
.list-item {
  border-radius: 12px;
  background: #fafafa;
}
</style>
