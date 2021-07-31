<template>
<body>
  <div style="display:flex; min-height:800px;">
    <side-bar />
    <div class="d-flex flex-column content-wrapper">
      <head-bar />
      <dash-board v-if="$route.name =='home'" />
      <router-view></router-view>
    </div>
  </div>
</body>
</template>

<script>
// @ is an alias to /src
import SideBar from '../components/SideBar.vue'
import HeadBar from '../components/HeadBar.vue'
import DashBoard from '../components/DashBoard.vue'
export default {
  name: 'Home',
  components: {
    SideBar,
    HeadBar,
    DashBoard
  }
}
</script>
<style scoped>
.content-wrapper {
  background-color: #f8f9fc;
  width: 100%;
  overflow-x: hidden;
}
</style>
