import { account, ID } from '@/lib/appwrite.js'

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      token: null,
      id: null,
      displayName: null
    }
  },
  getters: {
    getCurrentUser(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    },
    getUserId(state) {
      return state.id
    },
    getDisplayName(state) {
      return state.displayName
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.email
      state.token = payload.idToken
      state.id = payload.localId
      state.displayName = payload.displayName
    }
  },
  actions: {
    async registerUser(context, { email, password, name }) {
      await account.create(ID.unique(), email, password, name)
      await context.dispatch(`loginUser`, { email, password })
    },
    async loginUser(context, { email, password }) {
      await account.createEmailSession(email, password)
      context.dispatch(`getCurrentUser`)
    },
    async logout(context) {
      await account.deleteSession('current')
      context.commit(`setUser`, { email: null, displayName: null })
    },
    async getCurrentUser(context) {
      const data = await account.get()
      context.commit(`setUser`, { email: data.name, displayName: data.name })
    }
  }
}
