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
    <!-- 单词行 -->
    <el-card class="box-card">
      <div class="wordArea">
        <div class="buttonWrap" v-for="(item, index) in words" :key="index">
          <el-button type="primary" @click="speak(item)">
            {{ item }}
          </el-button>
        </div>
      </div>
    </el-card>
    <!-- 播放进度 -->
    <el-progress
      :show-text="false"
      :stroke-width="26"
      :percentage="percentageNum"
    ></el-progress>
    <audio controls :src="src" ref="audio"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: [
        "abbreviation",
        "bold",
        "emphasized",
        "italic",
        "section",
        "preview",
        "superscripted",
        "subscripted",
        "underline",
        "canvas",
        "caption",
        "alter",
        "span",
        "gutter",
        "span",
        "hover",
        "plugin",
        "browser",
        "module",
        "config",
        "issue",
        "-y",
        "cd:change directory",
        "dir:directory",
        "mkdir:make directory",
        "rmdir：remove directory",
        "case sensitive",
        "toggle",
        "infinite",
        "reverse",
        "radial",
        "radius",
        "exact",
        "/ ",
        "-",
        "transform:translateX",
        "fetch",
        "chunk",
        "cls",
        "chalk",
        "scope",
        "visible",
        "vertical ",
        "ECMA：European computer manufacturer association",

        // "transition",
        // "hello",
        // "padding",
        // "gutter",
        // "span",
        // "hover",
        // "plugin",
        // "browser",
        // "module",
        // "pull request",
        // "config",
        // "issue",
        // "compatible",
        // "url:uniform resource locator",
        // "aside",
        // "branch",
        // "dns:domain name system",
        // "link",
        // "charset",
        // "com:company",
        // "gov:goverment",
        // "www:world wide web",
        // "var:variable",
        // "const:constant",
        // "switch",
        // "reg:regular expression",
        // "promise",
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

<style lang="scss" scoped>
.box-card {
  height: 550px;
  width: 888px;
  margin: 0 auto;
}

.wordArea {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.buttonWrap {
  width: auto;
  height: auto;
  margin: 5px !important;
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
audio {
  display: none;
}
</style>
