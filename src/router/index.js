import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由管理的组件
// 首页区组件
import HomeMain from "./../components/home/main.vue"
import AdminLogin from "./../components/admin/login.vue"
import DepartmentMain from "./../components/department/main.vue"
import DepartmentList from "./../components/department/list.vue"
import DepartmentAdd from "./../components/department/add.vue"
import DepartmentModify from "./../components/department/modify.vue"
import DepartmentView from "./../components/department/view.vue"

Vue.use(VueRouter)

const routes = [{
		path: "/",
		name: "homemain",
		component: HomeMain
	},
	{
		path: "/department",
		name: "departmentmain",
		component: DepartmentMain,
		children: [{
				path: "list",
				name: "departmentlist",
				component: DepartmentList
			},
			{
				path: "add",
				name: "departmentadd",
				component: DepartmentAdd
			},
			{
				path: "modify/:deptid",
				name: "departmentmodify",
				component: DepartmentModify
			},
			{
				path: "view/:deptid",
				name: "departmentview",
				component: DepartmentView
			},
			{
				path: "",
				redirect: "list"
			}
		]
	},
	{
		path: "/login",
		name: "login",
		component: AdminLogin
	}

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
