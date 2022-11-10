

<template>
  <div class="customer">
    <img class="img" src="../assets/tjx-logo.png" alt="TJX logo" />

    <h1>Customer Information</h1>
  </div>
      <button type="button" class="btn btn-outline-danger">Seach</button>
      <div class="form-group">
    <select class="custom-select" required>
      <option value="">Open this select menu</option>
      <option value="1">Customer ID</option>
      <option value="2">Email</option>
    </select>
    <div class="invalid-feedback">Example invalid custom select feedback</div>

    <form id="searching">
      <div class="form-group">
        <input
          type="search"
          class="form-control"
          id="entercid"
          placeholder="Customer ID"
        />
      
      </div>
      <div class="form-group">
        <input
          v-model = "emailValue"
          type="search"
          class="form-control"
          id="email"
          placeholder="Email"
        />
      </div>
      <!--Search button for the email field-->
      <button type="button" class="btn btn-outline-danger" v-on:click="onGet">Search</button>
      <button type="button" class="btn btn-outline-danger" v-on:click="getAll">Get All</button>
      
    </form>


    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

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
  <!--Test Fetch print-->
  <!--remove when pushing to main repo-->
  <!-- <div>
    {{ customers }}
  </div> -->
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