import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
export default {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem('token') || '',
        siderType: true,
        lang: localStorage.getItem('lang') || 'zh'
    }),
    mutations: {
        setToken(state, token) {
            // console.log('token: ', token)
            state.token = token
            localStorage.setItem('token', token)
        },
        changeSiderType(state) {
            state.siderType = !state.siderType
        },
        changLang(state, lang) {
            state.lang = lang
        }
    },
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginApi(userInfo)
                    .then((res) => {
                        commit('setToken', res.data)
                        setTokenTime()
                        router.replace('/users')
                        resolve()
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        // 退出
        logout({ commit }) {
            commit('setToken', '')
            localStorage.clear()
            router.replace('/login')
        }
    }
}