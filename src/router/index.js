import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './../store/index'

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
<<<<<<< HEAD
=======
import ElderlyView from "./../components/elderly/view.vue"
import EmployeeMain from "./../components/employee/main.vue"
import EmployeeList from "./../components/employee/list.vue"
import EmployeeAdd from "./../components/employee/add.vue"
import EmployeeModify from "./../components/employee/modify.vue"
import EmployeeView from "./../components/employee/view.vue"
>>>>>>> 1a30482674513362e7e690db9a2e494b75042bf7
import PurchaseMain from "./../components/purchase/main.vue"
import PurchaseList from "./../components/purchase/list.vue"
import PurchaseAdd from "./../components/purchase/add.vue"
import PurchaseModify from "./../components/purchase/modify.vue"
// import ElderlyCost from "./../components/elderly/cost.vue"

import ConsumeMain from "./../components/consume/main.vue"
import ConsumeList from "./../components/consume/list.vue"
import ConsumeAdd from "./../components/consume/add.vue"
import ConsumeModify from "./../components/consume/modify.vue"
import ConsumeView from "./../components/consume/view.vue"

import EmployeeMain from "./../components/employee/main.vue"
import EmployeeList from "./../components/employee/list.vue"
import EmployeeAdd from "./../components/employee/add.vue"
import EmployeeModify from "./../components/employee/modify.vue"
import EmployeeView from "./../components/employee/view.vue"

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
				path: "view/:elderlyid",
				name: "elderlyview",
				component: ElderlyView
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
	},
	{
		path: "/consume",
		name: "consumemain",
		component: ConsumeMain,
		children: [{
				path: "list",
				name: "consumelist",
				component: ConsumeList
			},
			{
				path: "add",
				name: "consumeadd",
				component: ConsumeAdd
			},
			{
				path: "modify/:id/:date",
				name: "consumemodify",
				component: ConsumeModify
			},
			{
				path: "view/:id/:date",
				name: "consumeview",
				component: ConsumeView
			},
			{
				path: "",
				redirect: "list"
			}
		]
	},
	{
		path: "/employee",
		name: "employeemain",
		component: EmployeeMain,
		children: [{
				path: "list",
				name: "employeelist",
				component: EmployeeList
			},
			{
				path: "add",
				name: "employeeadd",
				component: EmployeeAdd
			},
			{
				path: "modify/:id",
				name: "employeemodify",
				component: EmployeeModify
			},
			{
				path: "view/:id",
				name: "employeeview",
				component: EmployeeView
			},
			{
				path: "",
				redirect: "list"
			}
		]
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// 路由守护实现登录拦截
router.beforeEach((to,from,next)=>{
	// to:目标路由
	// from：当前路由
	
	if(to.path=="/login"){
		next();
	}else{
		if(store.getters.loginuser != null){
			next();
		}else{
			next("/login");
		}
	}
})

export default router
