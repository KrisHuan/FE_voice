
<template>
  <div id="app">
    <div class="nav">
      <router-link to="/" @mouseover.native="toword()">单词</router-link>
      <router-link to="/sentence" @mouseover.native="tosen()">句子</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    tosen() {
      if (this.$route.path !== "/sentence") this.$router.push("/sentence");
    },
    toword() {
      if (this.$route.path !== "/") this.$router.push("/");
    },
  },
  watch: {},
};
</script>


<style lang="scss">
#app {
  width: 1344px;
}

.nav {
  width: 888px;
  margin: 0 auto;
  padding: 30px;

  a {
    font-size: 30px;
    margin-right: 10px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    display: inline-block;
    padding: 5px;
    border-radius: 5px;
    width: 100px;
    height: auto;
    text-align: center;

    &:hover {
      background-color: blue;
    }
    &.router-link-exact-active {
      color: white;
      background-color: cornflowerblue;
    }
  }
}
</style>
