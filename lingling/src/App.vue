<template>
  <div id="app">
    <header-view></header-view>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/common/header'
export default {
  name: 'app',
  components: {
    'header-view': header
  }
}
</script>

<style>
@import "./assets/icon/iconstyle/style.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
