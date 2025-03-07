import { reactive, readonly, computed } from 'vue'
const defaultState = {
    user: {},
    token: '',
    isLoggedIn: false,
    isLoading: false,
}
const state = reactive(defaultState)
const actions = {
    updateUserData: async () => {
        const token = localStorage.getItem('reverb_accessToken')
        actions.updateLoading(true)        
        if (!token) {
            actions.updateLoginState(false)
            actions.updateLoading(false)
            return false
        }
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.get('/api/user',params)
            state.user = response.data
            actions.updateLoginState(true)
            actions.updateLoading(false)
        } catch (error) {
            console.log(error.response.data)
            actions.updateLoginState(false)
            actions.updateLoading(false)
        }        
    },
    updateLoginState: (isLoggedIn) => {
        state.isLoggedIn = isLoggedIn
    },
    updateLoading: (loadingStatus) => {
        state.isLoading = loadingStatus
    },
    updateToken: () => {

    }
}
const getters = {
    getIsLoggedIn: () => {
        return computed(() => state.isLoggedIn)
    },
    getIsLoading: () => {
        return computed(() => state.isLoading)
    },
    getUsername: () => {
        return computed(() => state.user.username)
    }
}
actions.updateUserData()
export default () => ({
    state: readonly(state),
    ...actions,
    ...getters,
})