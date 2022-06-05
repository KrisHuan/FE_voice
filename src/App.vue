<template>
  <div id="app">
    <nav>
      <router-link to="/" @mouseover.native="toword()">单词</router-link>
      |
      <router-link to="/sentence" @mouseover.native="tosen()">句子</router-link>
    </nav>

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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &:hover {
      background-color: blue;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
