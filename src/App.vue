<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/customer">Customers</router-link> |
    <router-link to="/order">Orders</router-link> |
    <router-link to="/product">Products</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
img {
  width: 175px;
  float: left;
  margin-left: 30px;
}

button {
  float: right;
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 50px;
}
form {
  width: 300px;
  height: 150px;
  border-radius: 50px;
  margin-left: 225px;
  display: flex;
  flex-direction: column;
  align-items: left;
}
</style>
