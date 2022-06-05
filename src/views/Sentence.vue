<template>
  <div>
    <!-- 搜索 -->
    <el-card class="box-card">
      <!-- 查询 -->
      <el-input
        v-model="inputValue"
        autofocus
        @keyup.enter.native="pushWord()"
        ref="input"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-card>

    <!-- 单词行 -->
    <div v-for="(item, index) in words" :key="index" class="item">
      <el-button type="primary" @click="speak(item)" v-if="item.length < 30">
        {{ item }}
      </el-button>
      <el-row v-else>
        <div @click="speak(item)">{{ item }}</div></el-row
      >
    </div>
    <!-- 播放进度 -->

    <el-progress
      :show-text="false"
      :stroke-width="26"
      :percentage="parseFloat(percentage)"
    ></el-progress>

    <audio controls :src="src" ref="audio"></audio>
  </div>
</template>

<script>
export default {
  name: "Word",
  components: {},
  data() {
    return {
      words: [
        "Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.",
        "When building frontend applications, we often have the need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates stateless logic: it takes some input and immediately returns expected output. There are many libraries out there for reusing stateless logic - for example lodash and date-fns, which you may have heard of.",
      ],

      src: "",
      inputValue: "",
      percentage: 0,
    };
  },
  methods: {
    // 发音
    speak(item) {
      this.$refs.audio.load();
      this.src = `http://dict.youdao.com/dictvoice?audio=${item}`;
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
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 888px;
  margin: auto;
}
.el-input {
  margin-bottom: 10px;
  width: 600px;
}
.el-button {
  margin: 5px;
  display: inline-block;
}
.el-row {
  margin: 5px;
  background-color: cornflowerblue;
  color: white;
  padding: 10px;
  text-indent: 2rem;
  border-radius: 10px;
}
.el-row:hover {
  animation: big 2s linear infinite alternate;
}
@keyframes big {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.01); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.01);
  }
}

.el-progress {
  position: relative;
  display: block;
  width: 400px;
  height: 5px;
  margin: 10px auto;
}
</style>