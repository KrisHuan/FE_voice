<template>
  <div>
    <!-- 搜索开始 -->
    <div class="inputWrap">
      <el-input
        v-model="inputValue"
        autofocus
        @keyup.enter.native="pushWord()"
        ref="input"
        placeholder="请输入又香又长的句子"
      >
      </el-input>
    </div>
    <!-- 搜索结束 -->
    <el-card class="box-card">
      <!-- 单词行 -->
        <div 
          @click="speak(item)"
          v-for="(item, index) in words"
          :key="index"
          class="item"
        >
          {{ item }}
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
        `Handle Events We can use the v-on directive, which we typically shorten to the @ symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be v-on:click="handler" or with the shortcut, @click="handler".`,
        `Handle Events We can use the v-on directive, which we typically shorten to the @ symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be v-on:click="handler" or with the shortcut, @click="handler".`,
      ],
      src: '',
      inputValue: '',
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
      
      console.log(item);
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
      this.inputValue = '';
    },

    // 进度条
    playPro() {
      let music = this.$refs.audio;
      music.addEventListener('timeupdate', () => {
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
  width: 888px;
  height: 550px;
  overflow-y: scroll;
  .item{
    width: 400px;
    height: 200px;
    box-sizing: border-box;
    float: left;
    background-color: #409eff;
    color:white;
    border-radius: 10px;
    padding: 10px;
    margin: 5px;
  }
  margin: 0 auto;
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
