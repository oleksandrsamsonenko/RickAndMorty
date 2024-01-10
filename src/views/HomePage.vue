<template>
  <span class="show-wrapper">
    <input type="checkbox" id="filter-control" v-model="filterControl" class="show-checkbox" />
    <label for="filter-control" class="show">{{
      filterControl ? 'Hide filter menu' : 'Show filter menu'
    }}</label>
  </span>
  <transition>
    <div class="wrapper" v-show="filterControl">
      <div>
        <base-filter
          @setFilter="setStatus"
          :model="`status`"
          :value="status"
          :data="['all', 'alive', 'dead', 'unknown']"
        ></base-filter>

        <base-filter
          @setFilter="setGender"
          :model="`gender`"
          :value="gender"
          :data="['all', 'male', 'female', 'genderless', 'unknown']"
        ></base-filter>

        <form class="filter" @submit.prevent="setName">
          <span>Find by name:</span>
          <input
            class="input"
            type="text"
            id="search"
            placeholder="Search by name"
            v-model="name"
          />
          <button type="submit" class="search">Search</button>

          <transition name="reset">
            <button type="button" class="search" v-if="this.name.length > 0" @click="reset">
              Reset
            </button>
          </transition>
        </form>
      </div>
      <div class="total">
        <h3 class="total-title">Characters found:</h3>
        <p class="total-count">{{ count }}</p>
      </div>
      <transition name="reset"
        ><button type="button" class="search clear" v-if="shouldShowClear" @click="clear">
          Clear filters
        </button>
      </transition>
    </div>
  </transition>

  <transition name="page">
    <div v-if="!pageLoading">
      <ul v-if="characters.length > 0" class="list">
        <li v-for="character in characters" :key="character.id">
          <base-card
            :image="character.image"
            :name="character.name"
            :status="character.status"
            :species="character.species"
            :location="character.location.name"
            :gender="character.gender"
            :type="character.type"
            :origin="character.origin.name"
            :id="character.id"
          />
        </li>
      </ul>
      <h2 class="error" v-else>No result matching your criteria found</h2>
    </div>
  </transition>
  <base-pagination :pages="pages" @click="setPage"></base-pagination>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue'
import BasePagination from '@/components/BasePagination.vue'
import BaseFilter from '@/components/BaseFilter.vue'

export default {
  components: { BaseCard, BasePagination, BaseFilter },
  data() {
    return {
      fullLoading: false,
      pageLoading: false,
      currentPage: this.$route.query.page || 1,
      status: this.$route.query.status || '',
      gender: this.$route.query.gender || '',
      name: this.$route.query.name || '',
      filterControl: false
    }
  },
  computed: {
    shouldShowClear() {
      return this.status !== '' || this.gender !== '' || this.name !== ''
    },
    characters() {
      return this.$store.getters.getCharacters
    },
    pages() {
      return this.$store.getters.getPages
    },
    count() {
      return this.$store.getters.getTotalCount
    },
    queryParams() {
      const params = {
        page: this.currentPage,
        status: this.status,
        gender: this.gender,
        name: this.name
      }
      for (let param in params) {
        if (params[param] === '') {
          delete params[param]
        }
      }
      return params
    }
  },
  methods: {
    async fetchData(page, status, gender, name, loading) {
      if (loading === `full`) {
        this.fullLoading = true
        await this.$store.dispatch(`fetchCharacters`, { page, status, gender, name, type: 'full' })
        this.fullLoading = false
      }
      if (loading === `page`) {
        this.pageLoading = true
        await this.$store.dispatch(`fetchCharacters`, { page, status, gender, name, type: 'page' })
        this.pageLoading = false
      }
    },
    clear() {
      this.name = ''
      this.gender = ''
      this.status = ''
      this.currentPage = 1
      this.setQueryParams()
      this.fetchData(this.currentPage, this.status, this.gender, this.name, `full`)
    },
    reset() {
      this.name = ''
      this.setQueryParams()
      this.fetchData(this.currentPage, this.status, this.gender, this.name, `full`)
    },
    setPage(page) {
      this.currentPage = page
      this.setQueryParams()
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    setStatus(status) {
      if (status === 'all') {
        this.status = ''
        return
      }
      this.status = status
    },
    setGender(gender) {
      if (gender === 'all') {
        this.gender = ''
        return
      }
      this.gender = gender
    },
    setQueryParams() {
      this.$router.push({ query: this.queryParams })
    },
    setName() {
      this.currentPage = 1
      this.setQueryParams()
      this.fetchData(this.currentPage, this.status, this.gender, this.name, `full`)
    }
  },

  created() {
    this.setQueryParams()
    this.fetchData(this.currentPage, this.status, this.gender, this.name, `full`)
  },
  watch: {
    currentPage(curVal, oldVal) {
      if (curVal !== oldVal) {
        this.fetchData(this.currentPage, this.status, this.gender, this.name, `page`)
      }
    },
    status(curVal, oldVal) {
      if (curVal !== oldVal) {
        this.currentPage = 1
        this.setQueryParams()
        this.fetchData(this.currentPage, this.status, this.gender, this.name, `full`)
      }
    },
    gender(curVal, oldVal) {
      if (curVal !== oldVal) {
        this.currentPage = 1
        this.setQueryParams()
        this.fetchData(this.currentPage, this.status, this.gender, this.name, `full`)
      }
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
  gap: 15px;
  color: whitesmoke;
  margin-bottom: 10px;
}
.clear {
  margin-left: auto;
  height: fit-content;
}

.error {
  color: whitesmoke;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.input {
  background-color: rgb(42, 46, 54);
  color: whitesmoke;
  border: none;
  outline: 1px solid whitesmoke;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 110%;
  transition: all 0.75s;
}

.input:focus,
.input:hover {
  outline: 1px solid goldenrod;
}
.search {
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid whitesmoke;
  color: whitesmoke;
  font-size: 110%;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.75s;
}
.search:hover,
.search:focus {
  color: goldenrod;
  border: 1px solid goldenrod;
}

.list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.reset-enter-from,
.reset-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.reset-enter-active {
  transition: all 0.3s ease-out;
}

.reset-leave-active {
  transition: all 0.3s ease-in;
}

.reset-enter-to,
.reset-leave-from {
  opacity: 1;
  transform: scale(1);
}

.page-enter-from {
  opacity: 0;
}
.page-leave-to {
  opacity: 0;
}

.page-enter-active {
  transition: all 0.5s ease-out;
}

.page-leave-active {
  transition: all 0.5s ease-in;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
}
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.total {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.total-title {
  color: whitesmoke;
  font-size: 150%;
}

.total-count {
  color: whitesmoke;
  font-size: 450%;
}

.filter-enter-from {
  scale: 0.5;
}
.filter-leave-to {
  height: 100%;
}

.filter-enter-active {
  height: 100%;
  transition: all 5s ease-out;
}

.filter-leave-active {
  scale: 1;
}

.filter-enter-to,
.filter-leave-from {
  scale: 1;
}

.show-wrapper {
  display: block;
  margin-bottom: 20px;
}
.show-checkbox {
  display: none;
  opacity: 0;
  visibility: hidden;
}

.show {
  color: whitesmoke;
  font-size: 105%;
  outline: 1px solid whitesmoke;
  padding: 5px 10px;
  margin-bottom: 100px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
