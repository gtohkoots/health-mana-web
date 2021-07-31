<template>
  <div id="app" style="background-color: rgba(235, 235, 235, 0.08)">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 30px;
}

.nav > a {
  font-weight: bold;
  color: #2c3e50;
}

a > .router-link-exact-active {
  color: #42b983;
}
</style>
