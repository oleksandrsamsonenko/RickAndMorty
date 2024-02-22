import { createStore } from 'vuex'
import charactersModule from './characters'
import userModule from './auth'

const store = createStore({
  modules: {
    characters: charactersModule,
    user: userModule
  }
})

export default store
