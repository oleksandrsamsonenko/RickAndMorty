<template>
  <ul class="nav">
    <li v-for="n in pages" :key="n">
      <button
        type="button"
        class="button"
        :class="{ active: n === +this.$route.query.page }"
        @click="setPage(n)"
      >
        {{ n }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  emits: [`click`],
  props: {
    pages: {
      type: Number,
      required: true,
      default: 1
    }
  },
  methods: {
    setPage(num) {
      this.$emit('click', num)
    }
  }
}
</script>

<style scoped>
.nav {
  margin: 0 auto;
  max-width: 1440px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px 15px;
  place-content: center;
}

.button {
  min-width: 35px;
  min-height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 1s;
  background-color: rgb(42, 46, 54);
  border: 2px solid whitesmoke;
  color: whitesmoke;
  font-weight: bold;
}

.active {
  background-color: green;
  scale: 1.2;
}
</style>
