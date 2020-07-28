import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由管理的组件
// 首页区组件
import HomeMain from "./../components/home/main.vue"
import DepartmentMain from "./../components/department/main.vue"

Vue.use(VueRouter)

const routes = [
	{path:"/",name:"homemain",component:HomeMain},
	{path:"/department",name:"departmentmain",component:DepartmentMain}
	
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
