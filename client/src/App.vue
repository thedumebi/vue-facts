<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-main><router-view /></el-main>
    <el-footer><Footer /></el-footer>
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-container {
  display: grid;
  grid-template-rows: 7.5rem auto fit-content(8rem);
  grid-template-areas: "header" "main" "footer";
  padding-top: 0;
  min-height: 100%;
}

.el-header {
  grid-row: header;
}

.el-main {
  grid-row: main;
}

.el-footer {
  grid-row: footer;
}

.el-alert {
  width: 60%;
  margin: 0 auto;
}
</style>
