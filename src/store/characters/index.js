import axios from 'axios'
import { databases, ID } from '@/lib/appwrite.js'

export default {
  state() {
    return {
      total: null,
      pages: 1,
      characters: [],
      characterInfo: {},
      favorites: []
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
    },
    getFavorites(state) {
      return state.favorites
    },
    getStatus: (state) => (id) => {
      return state.favorites.find((item) => item.id === id)
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
    },
    setFavorites(state, payload) {
      state.favorites = payload
    },
    addFavorite(state, payload) {
      state.favorites.push(payload)
    },
    removeFavorite(state, payload) {
      state.favorites = state.favorites.filter((item) => item.$id !== payload)
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
        context.commit(`setCharacterInfo`, response.data)
      } catch (e) {
        console.log(e)
      }
    },

    async getFavorites(context) {
      const response = await databases.listDocuments('65c7809b4e66f0e7fa9b', '65c79a18b048c86014ca')
      context.commit(`setFavorites`, response.documents)
    },

    async addToFavorite(context, payload) {
      const response = await databases.createDocument(
        '65c7809b4e66f0e7fa9b',
        '65c79a18b048c86014ca',
        ID.unique(),
        { id: payload.id, name: payload.name }
      )
      context.commit('addFavorite', response)
    },

    async removeFromFavorite(context, payload) {
      await databases.deleteDocument('65c7809b4e66f0e7fa9b', '65c79a18b048c86014ca', payload.id)
      context.commit('removeFavorite', payload.id)
    }
  }
}
