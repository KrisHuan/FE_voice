<template>
  <div>
    <!-- 搜索开始 -->
    <div class="inputWrap">
      <el-input
        v-model="inputValue"
        autofocus
        @keyup.enter.native="pushWord()"
        ref="input"
        placeholder="各位前端靓仔靓女 您来查词了呀"
      >
      </el-input>
    </div>
    <!-- 搜索结束 -->
    <el-card class="box-card">
      <!-- 单词行 -->
      <div>
        <el-button
          type="primary"
          @click="speak(item)"
          v-for="(item, index) in words"
          :key="index"
          class="item"
        >
          {{ item }}
        </el-button>
      </div>
      <!-- 播放进度 -->

      <div class="block">
        <span class="demonstration">默认</span>
        <el-slider v-model="percentageNum"></el-slider>
      </div>

      <el-progress
        :show-text="false"
        :stroke-width="26"
        :percentage="percentageNum"
      ></el-progress>
    </el-card>
    <audio controls :src="src" ref="audio"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: [
        "transition",
        "hello",
        "padding",
        "gutter",
        "span",
        "hover",
        "plugin",
        "browser",
        "module",
        "pull request",
        "config",
        "issue",
        "compatible",
        "url:uniform resource locator",
        "aside",
        "branch",
        "dns:domain name system",
        "link",
        "charset",
        "com:company",
        "gov:goverment",
        "www:world wide web",
        "var:variable",
        "const:constant",
        "switch",
        "reg:regular expression",
        "promise",
      ],

      src: "",
      inputValue: "",
      percentage: 0,
    };
  },
  computed: {
    percentageNum: {
      get() {
        return Math.floor(this.percentage);
      },
      set(val) {
        return Math.floor(val);
      },
    },
  },

  methods: {
    // 发音
    speak(item) {
      this.$refs.audio.load();
      let subRes = this.sub(item);
      console.log(subRes);
      this.src = `http://dict.youdao.com/dictvoice?audio=${subRes}`;
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.playPro();
      });
    },
    // push后说出此个单词或句子
    pushWord() {
      this.words.unshift(this.inputValue);
      this.speak(this.inputValue);
      this.inputValue = "";
    },
    // 截取：后面的字符串
    sub(str) {
      let index = str.indexOf(":");
      return str.substring(index + 1);
    },
    // 进度条
    playPro() {
      let music = this.$refs.audio;
      music.addEventListener("timeupdate", () => {
        const duration = music.duration; // 获得音频时长
        const currentTime = music.currentTime; // 获得已播放的音频时长
        if (duration > 0 && duration > 0) {
          let per = (currentTime / duration) * 100;
          console.log(per);
          this.percentage = `${per}`; // 计算进度条所在比例宽度
        }
        if (duration === currentTime) {
          this.percentage = 0;
        }
      });
    },
  },
};
</script>


<style lang="scss">
.box-card {
  width: 888px;
  margin: 0 auto;
}
.el-button {
  margin: 5px !important;
  display: inline-block;
}

.el-progress {
  position: relative;
  display: block;
  width: 400px;
  height: 5px;
  margin: 10px auto;
}

.inputWrap {
  width: 888px;
  margin: 0 auto 10px auto;
}
.item {
  display: flex;
}
</style>