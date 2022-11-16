<template>
  <main class="login">
    <section class="forms">
      <form class="register" @submit.prevent="register">
        <h2>Register</h2>
        <input type="email" placeholder="Email address" v-model="registerForm.email" />
        <input type="password" placeholder="Password" v-model="registerForm.password" />
        <input type="submit" value="Register" />
      </form>

      <form class="login" @submit.prevent="login">
        <h2>Login</h2>
        <input type="email" placeholder="Email address" v-model="loginForm.email" />
        <input type="password" placeholder="Password" v-model="loginForm.password" />
        <input type="submit" value="Login" />
      </form>
    </section>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const loginForm = ref({});
    const registerForm = ref({});
    const store = useStore();
    const login = () => {
      store.dispatch('login', loginForm.value);
    };
    const register = () => {
      store.dispatch('register', registerForm.value);
    };
    return {
      loginForm,
      registerForm,
      login,
      register,
    };
  },
};
</script>

<style>

</style>
