import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loginuser: null,
		visitCount: 0
	},
	getters: { // 取得store中数据的方法
		loginuser(state) {
			return state.loginuser;
		}
	},
	mutations: { // 更改的方法
		setLoginUser(state, user) {
			state.loginuser = user;
		},
		setLogoutUser(state) {
			state.loginuser = null;
		}
	},
	actions: { // 定义提交mutations的方法
		loginUser(state, user) {
			state.commit("setLoginUser", user);
		},
		logoutUser(state) {
			state.commit("setLogoutUser");
		}
	},
	modules: {}
})
