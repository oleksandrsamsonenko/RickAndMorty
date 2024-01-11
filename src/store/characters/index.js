import axios from 'axios'

export default {
  //   namespaced: true,
  state() {
    return {
      total: null,
      pages: 1,
      characters: [],
      characterInfo: {}
    }
  },
  getters: {
    getTotalCount(state) {
      return state.total
    },
    getCharacters(state) {
      return state.characters
    },
    getPages(state) {
      return state.pages
    },
    getCharacterInfo(state) {
      return state.characterInfo
    }
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload.characters
    },
    setTotalCount(state, payload) {
      state.total = payload.total
    },
    setPages(state, payload) {
      state.pages = payload.pages
    },
    setCharacterInfo(state, payload) {
      state.characterInfo = payload
    }
  },
  actions: {
    async fetchCharacters(context, payload) {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${payload.page}&status=${payload.status}&gender=${payload.gender}&name=${payload.name}`
        )
        context.commit(`setCharacters`, { characters: response.data.results })
        context.commit(`setTotalCount`, { total: response.data.info.count })
        context.commit(`setPages`, { pages: response.data.info.pages })
      } catch (e) {
        context.commit(`setTotalCount`, { total: 0 })
        context.commit(`setPages`, { pages: 0 })
        context.commit(`setCharacters`, { characters: [] })
      }
    },
    async fetchCharactersById(context, payload) {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${payload.id}`)
        console.log(response)
        context.commit(`setCharacterInfo`, response.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
