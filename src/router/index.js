import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserProfile from '../components/UserProfile.vue'
import OtherProfile from '../components/OtherProfile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path:'selfCheck', component: UserProfile },
      { path:'checkOther', component: OtherProfile }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
