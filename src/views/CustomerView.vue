<template>
  <div class="customer">
    <img class="img" src="../assets/tjx-logo.png" alt="TJX logo" />

    <h1>Customer Information</h1>
  </div>
      <div class="form-group">

    <form id="searching">
      <div class="form-group">
        <input
          v-model = "emailValue"
          type="search"
          class="form-control"
          id="email"
          placeholder="Email"
        />
        <!--Search button for the email field-->
        <button type="button" class="btn btn-outline-danger" v-on:click="onGet">Search</button>
        <button type="button" class="btn btn-outline-danger" v-on:click="getAll">Get All</button>
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
        <tr v-for = "customer in customers" :key="customer.id">
            <!--Change these to proper fields-->
            <td scope="row">{{ customer.id }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.phone }}</td>
            
        </tr> 

      </tbody>
    </table>
  </div>
</template>



<script>
import axios from "axios";
export default {
    data() {
        return {
            customers: [],
        };
    },
    mounted: function () {
            axios
                //Change to eic API endpoint
                .get(`https://jsonplaceholder.typicode.com/users`)
                .then((response) => {
                    console.log(response);
                    //returns as raw JSON
                    this.customers = response.data
                })
                .catch((errors) => {
                    console.log(errors); // Errors
                });
    },
    name: "App",
    methods: {
        // The get method called by the function
        onGet() {
            axios
                //Change to eic API endpoint
                .get(`https://jsonplaceholder.typicode.com/users?email=${this.emailValue}`)
                .then((response) => {
                    console.log(response);
                    //returns as raw JSON
                    this.customers = response.data
                })
                .catch((errors) => {
                    console.log(errors); // Errors
                });
        },
        getAll(){
            axios
                //Change to eic API endpoint
                .get(`https://jsonplaceholder.typicode.com/users`)
                .then((response) => {
                    console.log(response);
                    //returns as raw JSON
                    this.customers = response.data
                })
                .catch((errors) => {
                    console.log(errors); // Errors
                });
        }
    },
};
</script>