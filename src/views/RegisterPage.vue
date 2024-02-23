<template>
  <form @submit.prevent="register" class="form">
    <h1 class="title">Create account here</h1>
    <fieldset>
      <label for="name">Username</label>
      <input
        v-model="username"
        type="text"
        id="username"
        placeholder="Enter your username"
        autocomplete="off"
      />
    </fieldset>
    <fieldset>
      <label for="email">Email</label>
      <input
        v-model="email"
        type="email"
        id="email"
        placeholder="Enter your email"
        autocomplete="off"
      />
    </fieldset>
    <fieldset>
      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        id="password"
        placeholder="Enter your password"
        autocomplete="off"
      />
    </fieldset>

    <button type="submit" :disabled="buttonStatus">Register</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      username: null,
      password: null,
      loading: false,
      error: null
    }
  },
  computed: {
    buttonStatus() {
      return this.email === null || this.username === null || this.password === null
    }
  },
  methods: {
    async register() {
      this.loading = true
      this.error = null
      try {
        await this.$store.dispatch(`user/registerUser`, {
          email: this.email,
          password: this.password,
          name: this.username
        })
        this.$router.push('/')
      } catch (error) {
        this.error = error.message
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  margin: auto;
  width: 90%;
  display: flex;
  gap: 30px;
  flex-direction: column;
  border: 2px solid wheat;
  border-radius: 15px;
  padding: 50px 25px;
  font-size: 120%;
  @media screen and (min-width: 768px) {
    min-width: 400px;
    width: 60%;
  }
}

fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.title {
  color: wheat;
  margin: auto;
}

label {
  color: whitesmoke;
}

input {
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 10px;
  width: 100%;
}

button {
  background-color: transparent;
  color: wheat;
  border: 1px solid wheat;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: goldenrod;
    border-color: goldenrod;
  }
}

.error {
  color: red;
}
</style>
