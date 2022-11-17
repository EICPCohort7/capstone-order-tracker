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

  <!-- <div
    v-if="$store.state.user"
    id="nav"
  >
    <router-link to="/">Home</router-link>
    |
    <router-link to="/customer">Customers</router-link>
    |
    <router-link to="/order">Orders</router-link>
    |
    <router-link to="/product">Products</router-link>
    <button
      class="btn btn-outline-danger"
      @click="$store.dispatch('logout')"
    >
      Logout
    </button>
  </div> -->
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
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  color: #e5006d;
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
