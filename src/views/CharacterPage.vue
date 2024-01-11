<template>
  <transition name="page">
    <div v-if="!loading" class="wrapper">
      <p>Info about character:</p>
      <h1>{{ character.name }}</h1>
      <img :src="character.image" :alt="character.name" />
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
      <p v-if="character.type.length > 0">Type: {{ character.type }}</p>
      <p>Gender: {{ character.gender }}</p>
      <p>Last known location: {{ character.location.name }}</p>
      <p>Amount of appearances in episodes: {{ character.episode.length }}</p>
      <base-pagination :pages="character.episode.length"></base-pagination>
      <button @click="$router.back()">Back to characters</button>
    </div>
  </transition>
</template>

<script>
import BasePagination from '@/components/BasePagination.vue'
export default {
  components: { BasePagination },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    character() {
      return this.$store.getters.getCharacterInfo
    }
  },
  methods: {
    async getCharacterById(id) {
      this.loading = true
      await this.$store.dispatch(`fetchCharactersById`, { id })
      this.loading = false
    }
  },
  created() {
    this.getCharacterById(this.$route.params.id)
    // console.log(this.$route)
  },
  unmounted() {
    this.$store.commit(`setCharacterInfo`, {})
  }
}
</script>

<style scoped>
.wrapper {
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 125%;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-in-out;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>
