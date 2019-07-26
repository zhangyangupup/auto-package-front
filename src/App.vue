<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
   
  },
};
</script>

<style>
@import '../static/fonts/font.css';
#app {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
