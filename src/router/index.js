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
import ElderlyMain from "./../components/elderly/main.vue"
import ElderlyList from "./../components/elderly/list.vue"
import ElderlyAdd from "./../components/elderly/add.vue"
import ElderlyModify from "./../components/elderly/modify.vue"
import ElderlyCost from "./../components/elderly/cost.vue"
import PurchaseMain from "./../components/purchase/main.vue"
import PurchaseList from "./../components/purchase/list.vue"
import PurchaseAdd from "./../components/purchase/add.vue"
import PurchaseModify from "./../components/purchase/modify.vue"
// import ElderlyCost from "./../components/elderly/cost.vue"

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
	},
	{
		path: "/elderly",
		name: "elderlymain",
		component: ElderlyMain,
		children: [{
				path: "list",
				name: "elderlylist",
				component: ElderlyList
			},
			{
				path: "add",
				name: "elderlyadd",
				component: ElderlyAdd
			},
			{
				path: "modify/:elderlyid",
				name: "elderlymodify",
				component: ElderlyModify
			},
			{
				path: "cost/:elderlyid",
				name: "elderlycost",
				component: ElderlyCost
			},
			{
				path: "",
				redirect: "list"
			}
		]
	},
	{
		path: "/purchase",
		name: "purchasemain",
		component: PurchaseMain,
		children: [{
				path: "list",
				name: "purchaselist",
				component: PurchaseList
			},
			{
				path: "add",
				name: "purchaseadd",
				component: PurchaseAdd
			},
			{
				path: "modify/:goodsid/:date",
				name: "purchasemodify",
				component: PurchaseModify
			},
			
			{
				path: "",
				redirect: "list"
			}
		]
	}


]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
