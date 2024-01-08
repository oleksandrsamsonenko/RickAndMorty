<template>
  <div class="header">
    <div class="container">
      <img src="../assets/images/rick-and-morty-shop-logo-1-1.png" alt="Logo" />
      <p>Welcome to the Rick and Morty database</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  height: 80px;
}

p {
  color: rgb(158, 158, 158);
  font-weight: bold;
  font-size: 145%;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: rgb(32, 35, 41);
  padding: 0px 25px;
}
</style>
