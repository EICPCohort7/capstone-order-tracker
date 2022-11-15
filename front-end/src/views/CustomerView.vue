<template>
  <div class="customer">
    <img
      class="img"
      src="../assets/tjx-logo.png"
      alt="TJX logo"
    >

    <h1>Customer Information</h1>
  </div>
  <div class="form-group">
    <form id="searching">
      <div class="form-group">
        <input
          id="email"
          v-model="emailValue"
          type="search"
          class="form-control"
          placeholder="Email"
        >
        <!--Search button for the email field-->
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="getEmail"
        >
          Search
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="getCustomers"
        >
          Get All
        </button>
      </div>
    </form>
    <!--Data Table-->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Customer ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Middle Inital</th>
          <th scope="col">Last Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in customers"
          :key="customer.id"
        >
          <!--Change these to proper fields-->
          <td scope="row">{{ customer.customerId }}</td>
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.middleInitial }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      customers: [],
    };
  },

  mounted: async function () {
    let customers = await axios.get('http://localhost:3000/api/v1/customers/')
      .catch((errors) => {
        console.log(errors); // Errors
      });
    this.customers = customers.data;
  },
  methods: {
    // The get method called by the function

    async getCustomers() {
      let customers = await axios.get('http://localhost:3000/api/v1/customers/')
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customers = customers.data;
    },

    async getEmail() {
      let customers = await axios.get(`http://localhost:3000/api/v1/customers/search?email=${this.emailValue}`)
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customers = customers.data;
    },

  },
};
</script>
