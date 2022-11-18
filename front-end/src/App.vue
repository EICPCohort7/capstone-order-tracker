<template>
  <nav
    class="navbar navbar-light"
    style="background-color: #9b0c23"
  >
    <div
      v-if="$store.state.user"
      id="nav"
    >
      <!-- Navbar content -->
      <a
        class="navbar-brand"
        href="#"
      >
        <img
          src="../src/assets/tjx-white.png"
          alt=""
        >
      </a>

      <router-link to="/">Home</router-link>
      |
      <router-link to="/customer">Customers</router-link>
      |
      <router-link to="/order">Orders</router-link>
      |
      <router-link to="/product">Products</router-link>
      <button
        id="logout-button"
        class="btn btn-dark"
        @click="$store.dispatch('logout')"
      >
        Logout
      </button>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch('fetchUser');
    });
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, Avenir, Arial, sans-serif;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Avenir, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
h1 {
  font-weight: bolder;
  font-size: 80pt;
}
h2 {
  font-weight: bold;
  font-size: 60pt;
}
h3 {
  font-size: 45pt;
}
p {
  font-size: 15pt;
}
.subtitle{
  font-size: 13pt;
  color: #434241;
}
caption{
  font-size: 13pt;
  color: #434241;
}
button{
  font-size: 14pt;
  letter-spacing: 12%;
}
#title {
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 100px;
  color: #9b0c23;
}
#logout-button {
  float: right;
  margin-top: 15px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-left: 1525px;
  font-size: larger;
  font-weight: bolder;

}
nav {
  padding: 30px;
  height: 90px;
}

div a {
  font-weight:bolder;
  color: #ffffff;
  font-size: 0.75cm;
}

div a.router-link-exact-active {
  color: #ffffff;
  padding: 30px;
  background-color: #e5006d;
}
img {
  width: 120px;
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
table {
  margin-top: 150px;
  padding:50px
}
</style>
