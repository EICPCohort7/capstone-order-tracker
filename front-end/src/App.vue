<template>
  <div
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
  </div>
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

div {
  padding: 30px;
}

div a {
  font-weight: bold;
  color: #2c3e50;
}

div a.router-link-exact-active {
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
