<template>
  <form @submit.prevent="login" class="form">
    <h1 class="title">Login here</h1>
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
    <div class="error" v-if="error">{{ error }}</div>

    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: `alex@gmail.com`,
      password: `Sooqa123`,
      error: null
    }
  },
  methods: {
    async login() {
      try {
        this.error = null
        await this.$store.dispatch(`user/loginUser`, {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch (error) {
        this.error = error.message
        console.log(error.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  margin: auto;
  display: flex;
  width: 90%;
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
