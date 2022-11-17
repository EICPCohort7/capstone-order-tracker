<template>
  <main class="login">
    <section class="forms">
      <form
        class="register"
        @submit.prevent="register"
      >
        <h2>Register</h2>
        <input
          v-model="registerForm.email"
          type="email"
          placeholder="Email address"
        >
        <input
          v-model="registerForm.password"
          type="password"
          placeholder="Password"
        >
        <input
          type="submit"
          value="Register"
        >
      </form>

      <form
        class="login"
        @submit.prevent="login"
      >
        <h2>Login</h2>
        <input
          v-model="loginForm.email"
          type="email"
          placeholder="Email address"
        >
        <input
          v-model="loginForm.password"
          type="password"
          placeholder="Password"
        >
        <input
          type="submit"
          value="Login"
        >
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
.forms {
  display: flex;
  min-height: 100vh;
}
form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}
/*  form.register {
  color: #fff;
  background-color: rgb(245, 66, 101);
  background-image: linear-gradient(to bottom right, rgb(245, 66, 101) 0%, rgb(189, 28, 60) 100%);
} */
h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}
input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}
input:not([type='submit']) {
  opacity: 0.8;
  transition: 0.4s;
}
input:focus:not([type='submit']) {
  opacity: 1;
}
input::placeholder {
  color: inherit;
}
form.register input:not([type='submit']) {
  color: #434241;
  border-bottom: 2px solid #434241;
}
form.login input:not([type='submit']) {
  color: #434241;
  border-bottom: 2px solid #434241;
}
form.login input[type='submit'] {
  background-color: #9b0c23;
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
form.register input[type='submit'] {
  background-color: #e5006d;
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
