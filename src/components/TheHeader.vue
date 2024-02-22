<template>
  <div class="header">
    <div class="container">
      <router-link v-if="!path" :to="{ name: 'home', query: { page: 1 } }" class="logo">
        <img src="../assets/images/rick-and-morty-shop-logo-1-1.png" alt="Logo" />
      </router-link>
      <div v-else class="logo">
        <img src="../assets/images/rick-and-morty-shop-logo-1-1.png" alt="Logo" />
      </div>
      <!-- <p class="greeting">Welcome to the Rick and Morty database</p> -->

      <div class="nav" v-if="!isLoggedIn">
        <router-link :to="{ name: 'register' }" class="link">Register</router-link>
        <router-link :to="{ name: 'login' }" class="link">Login</router-link>
      </div>
      <div class="nav" v-if="isLoggedIn">
        <span style="color: wheat; font-size: large">
          {{ this.$store.getters['user/getDisplayName'] }}
        </span>
        <button @click="logout" class="link" style="background-color: transparent">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    path() {
      return this.$route.path === '/'
    },
    isLoggedIn() {
      return this.$store.getters['user/getCurrentUser']
    },
    getSessionInfo() {
      return JSON.parse(localStorage.getItem(`cookieFallback`))
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch(`user/logout`)
    },
    async restoreSession() {
      if (!this.getSessionInfo && typeof this.getSessionInfo !== Array) {
        return
      }
      await this.$store.dispatch(`user/getCurrentUser`)
      await this.$store.dispatch(`getFavorites`)
    }
  },
  created() {
    this.restoreSession()
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.greeting {
  margin-left: auto;
  margin-right: 25px;
}

.nav {
  display: flex;
  gap: 10px;
  align-items: center;
}
.link {
  cursor: pointer;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid whitesmoke;
  color: whitesmoke;
  border-radius: 10px;
  font-size: 105%;
  line-height: 1.6;
  transition: all 0.75s;
  min-width: 55px;
  text-align: center;
  text-transform: capitalize;
  &:hover {
    color: goldenrod;
    border-color: goldenrod;
  }
}

.link:hover {
  color: goldenrod;
  border-color: goldenrod;
}
.logo {
  height: 80px;
  border: none;
  background-color: transparent;
}
img {
  height: 100%;
}

p {
  color: rgb(158, 158, 158);
  font-weight: bold;
  font-size: 145%;
}
.header {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: rgb(32, 35, 41);
  padding: 0px 25px;
}
</style>
