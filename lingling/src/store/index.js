import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 *Vuex全局状态管理
 * @param xxx
 */
const store = new Vuex.Store({
	state: {
		user: sessionStorage.getItem('user')
	},
	mutations: {
		setUsername(state, _user) {
			state.user = _user;
			sessionStorage.setItem('user', _user)
		},
		clearUser(state) {
			state.user = null;
		}
	}
})

export default store;