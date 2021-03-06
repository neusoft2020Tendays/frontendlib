import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './../store/index'
// 引入路由管理的组件
// 首页区组件
import HomeMain from "./../components/home/main.vue"
import AdminLogin from "./../components/admin/login.vue"
import AdminMain from "./../components/admin/main.vue"
import AdminAdd from "./../components/admin/add.vue"

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
import ElderlyView from "./../components/elderly/view.vue"

import EmployeeMain from "./../components/employee/main.vue"
import EmployeeList from "./../components/employee/list.vue"
import EmployeeAdd from "./../components/employee/add.vue"
import EmployeeModify from "./../components/employee/modify.vue"
import EmployeeView from "./../components/employee/view.vue"

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

import GoodsMain from "./../components/goods/main.vue"
import GoodsList from "./../components/goods/list.vue"
import GoodsAdd from "./../components/goods/add.vue"
import GoodsModify from "./../components/goods/modify.vue"
import GoodsView from "./../components/goods/view.vue"

import WarehouseMain from "./../components/warehouse/main.vue"
import WarehouseList from "./../components/warehouse/list.vue"
import WarehouseAdd from "./../components/warehouse/add.vue"
import WarehouseModify from "./../components/warehouse/modify.vue"
import WarehouseView from "./../components/warehouse/view.vue"

import SalaryMain from "./../components/salary/main.vue"
import SalaryList from "./../components/salary/list.vue"
import SalaryAdd from "./../components/salary/add.vue"
import SalaryModify from "./../components/salary/modify.vue"
import SalaryView from "./../components/salary/view.vue"

import WardMain from "./../components/ward/main.vue"
import WardList from "./../components/ward/list.vue"
import WardAdd from "./../components/ward/add.vue"
import RoomList from "./../components/ward/roomlist.vue"
import CostMain from "./../components/cost/main.vue"
import CostAdd from "./../components/cost/add.vue"
import CostList from "./../components/cost/list.vue"
import CostModify from "./../components/cost/modify.vue"
import GuestMain from "./../components/guest/main.vue"
import GuestModify from "./../components/guest/modify.vue"
import GuestList from "./../components/guest/list.vue"
import GuestAdd from "./../components/guest/add.vue"

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
		path: "/admin",
		name: "adminmain",
		component: AdminMain,
		children: [{
				path: "login",
				name: "login",
				component: AdminLogin
			},
			{
				path: "add",
				name: "adduser",
				component: AdminAdd
			},
			{
				path: "",
				redirect: "login"
			}
		]
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
	{
		path: "/goods",
		name: "goodsmain",
		component: GoodsMain,
		children: [{
				path: "list",
				name: "goodslist",
				component: GoodsList
			},
			{
				path: "add",
				name: "goodsadd",
				component: GoodsAdd
			},
			{
				path: "modify/:id",
				name: "goodsmodify",
				component: GoodsModify
			},
			{
				path: "view/:id",
				name: "goodsview",
				component: GoodsView
			},
			{
				path: "",
				redirect: "list"
			}
		]
	},
	{
		path: "/warehouse",
		name: "warehousemain",
		component: WarehouseMain,
		children: [{
				path: "list",
				name: "warehouselist",
				component: WarehouseList
			},
			{
				path: "add",
				name: "warehouseadd",
				component: WarehouseAdd
			},
			{
				path: "modify/:warehouseid",
				name: "warehousemodify",
				component: WarehouseModify
			},
			{
				path: "view/:warehouseid",
				name: "warehouseview",
				component: WarehouseView
			},
			{
				path: "",
				redirect: "list"
			}
		]
	},
	{
		path: "/salary",
		name: "salarymain",
		component: SalaryMain,
		children: [{
				path: "list",
				name: "salarylist",
				component: SalaryList
			},
			{
				path: "add",
				name: "salaryadd",
				component: SalaryAdd
			},
			{
				path: "modify/:salaryId",
				name: "salarymodify",
				component: SalaryModify
			},
			{
				path: "view/:salaryId",
				name: "salaryview",
				component: SalaryView
			},
			{
				path: "",
				redirect: "list"
			}
		]
	},
	{
		path: "/ward",
		name: "wardmain",
		component: WardMain,
		children: [{
				path: "list",
				name: "wardlist",
				component: WardList
			}, {
				path: "add",
				name: "wardadd",
				component: WardAdd
			},
			{
				path: "roomlist",
				name: "roomlist",
				component: RoomList
			},
			{
				path: "",
				redirect: "list"
			}
		]
	}, {
		path: "/cost",
		name: "costmain",
		component: CostMain,
		children: [{
				path: "list",
				name: "costlist",
				component: CostList
			}, {
				path: "add",
				name: "wardadd",
				component: CostAdd
			},
			{
				path: "",
				redirect: "list"
			},
			{
				path: "modify/:costid",
				name: "costmodify",
				component: CostModify
			}

		]
	}, {
		path: "/guest",
		name: "guestmain",
		component: GuestMain,
		children: [{
				path: "list",
				name: "guestlist",
				component: GuestList
			}, {
				path: "guest",
				name: "guestadd",
				component: GuestAdd
			},
			{
				path: "",
				redirect: "list"
			},
			{
				path: "modify/:guestid",
				name: "guestmodify",
				component: GuestModify
			}

		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// 路由守护实现登录拦截
router.beforeEach((to, from, next) => {
	// to:目标路由
	// from：当前路由
	if (to.path == "/admin/login" || to.path == "/admin/add") {
		next();
	} else {
		if (store.getters.loginuser != null) {
			next();
		} else {
			next("/admin");
		}
	}
})

export default router
