<template>
  <TheHeader />
  <RouterView></RouterView>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  components: { TheHeader }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

html {
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
}
</style>
