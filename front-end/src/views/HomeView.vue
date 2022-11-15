<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/tjx-logo.png"
    >
    <HelloWorld msg="Welcome to the TJX CSR home page" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
};
</script>
