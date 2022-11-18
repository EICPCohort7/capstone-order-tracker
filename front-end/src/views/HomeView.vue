<template>
  <div class="home">
    <h1 id="title">Welcome to the CSR Home Page</h1>
    <br>
    <img
      id="homeLogo"
      src="../assets/tjx-logo.png"
      alt="Home page TJX logo"
    >
    <br><br><br><br>
    <p>Use the navigation bar above to read and search through TJX's databases of customers, orders, and products.</p>

    <p class="subtitle">This application was created by TJX's EICP Cohort 7 in November 2022.</p>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
};
</script>

<style>
#homeLogo{
  width: 20%;
  height: 20%;
}
</style>
