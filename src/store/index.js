import { createStore } from 'vuex'

// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            user: {
                token: '',
                isLogin: false,
            }
        }
    },
    mutations: {
        login(state, token) {
            state.user.token = token
            state.user.isLogin = true
        },
        setUser(state, data) {
            state.user.token = data.token
            state.user.isLogin = data.isLogin
        }
    }
})
