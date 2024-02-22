<template>
  <span class="show-wrapper">
    <input type="checkbox" id="filter-control" v-model="filterControl" class="show-checkbox" />
    <label for="filter-control" class="show">{{
      filterControl ? 'Hide filter menu' : 'Show filter menu'
    }}</label>
  </span>

  <transition name="reset">
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
            v-model="search"
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

  <div class="container mobile">
    <!-- <base-pagination :pages="pages" @click="setPage"></base-pagination> -->
    <vue-awesome-paginate
      :total-items="pages"
      :items-per-page="1"
      :max-pages-shown="3"
      v-model="currentPage"
      :on-click="setPage"
      :show-breakpoint-buttons="true"
      :show-ending-buttons="false"
      :hidePrevNext="true"
    />
  </div>
  <div class="container desktop">
    <vue-awesome-paginate
      :total-items="pages"
      :items-per-page="1"
      :max-pages-shown="10"
      v-model="currentPage"
      :on-click="setPage"
      :show-breakpoint-buttons="true"
      :show-ending-buttons="false"
      :hidePrevNext="true"
    />
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue'
// import BasePagination from '@/components/BasePagination.vue'
import BaseFilter from '@/components/BaseFilter.vue'
export default {
  components: { BaseCard, BaseFilter },
  data() {
    return {
      pageLoading: false,
      filterControl: true,
      currentPage: +this.$route.query.page || 1,
      status: this.$route.query.status || '',
      gender: this.$route.query.gender || '',
      name: this.$route.query.name || '',
      search: this.$route.query.name || ''
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/getCurrentUser']
    },
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
    async fetchData(page, status, gender, name) {
      this.pageLoading = true
      await this.$store.dispatch(`fetchCharacters`, { page, status, gender, name })
      this.pageLoading = false
    },
    async getFavorites() {
      await this.$store.dispatch(`getFavorites`)
    },
    clear() {
      this.name = ''
      this.gender = ''
      this.status = ''
      this.search = ''
      this.currentPage = 1
      this.setQueryParams()
    },
    reset() {
      this.name = ''
      this.search = ''
      this.setQueryParams()
    },
    setPage(page) {
      this.currentPage = +page
      this.setQueryParams()
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    setStatus(status) {
      this.currentPage = 1
      if (status === 'all') {
        this.status = ''
      } else this.status = status
      this.setQueryParams()
    },
    setGender(gender) {
      this.currentPage = 1
      if (gender === 'all') {
        this.gender = ''
      } else this.gender = gender
      this.setQueryParams()
    },
    setQueryParams() {
      this.$router.push({ query: this.queryParams })
    },
    setName() {
      this.currentPage = 1
      this.name = this.search
      this.setQueryParams()
    }
  },
  mounted() {
    this.setQueryParams()
    this.fetchData(this.currentPage, this.status, this.gender, this.name)
    this.getFavorites()
  },
  watch: {
    queryParams() {
      this.fetchData(this.currentPage, this.status, this.gender, this.name)
    }
  }
}
</script>

<style scoped lang="scss">
.filter {
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: start;
  }
  display: flex;
  align-items: center;
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
  grid-template-columns: 1fr;
  gap: 25px;
  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
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
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
.container {
  display: flex;
  padding: 5px 0px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(32, 35, 41);
}
.wrapper {
  transition: all 0.5s;
}

.mobile {
  @media screen and (min-width: 768px) {
    display: none;
  }
}

.desktop {
  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
