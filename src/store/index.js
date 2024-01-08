import { createStore } from 'vuex'
import charactersModule from './characters/index.js'

const store = createStore({
  modules: { characters: charactersModule }
})

export default store
