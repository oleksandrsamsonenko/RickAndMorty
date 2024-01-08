import axios from 'axios'

export default {
  //   namespaced: true,
  state() {
    return {
      total: null,
      pages: null,
      characters: []
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
    }
  },
  actions: {
    async fetchCharacters(context, payload) {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${payload.page}&status=${payload.status}&gender=${payload.gender}&name=${payload.name}`
        )
        // console.log(response)
        context.commit(`setCharacters`, { characters: response.data.results })
        if (payload.type === `full`) {
          context.commit(`setTotalCount`, { total: response.data.info.count })
          context.commit(`setPages`, { pages: response.data.info.pages })
        }
      } catch (e) {
        context.commit(`setTotalCount`, { total: 0 })
        context.commit(`setPages`, { pages: 0 })
        context.commit(`setCharacters`, { characters: [] })
      }
    }
  }
}
