<template>
  <div class="customer">
    <img class="img" src="../assets/tjx-logo.png" alt="TJX logo" />

    <h1>Customer Information</h1>
  </div>
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

<!--Modal-->
<button id="show-modal" @click="showModal = true" class="btn btn-outline-danger">New Customer</button>

<Teleport to="body">
  <!-- use the modal component, pass in the prop -->
  <modal :show="showModal" @close="showModal = false">
    <template #header>
      <h3>Create a new Customer</h3>
    </template>
    <template #body>
        <input
          type="text"
          class="form-control"
          id="firstName"
          placeholder="First Name"
        />
        <input
          type="text"
          class="form-control"
          id="middleName"
          placeholder="Middle Initial"
        />
        <input
          type="text"
          class="form-control"
          id="lastName"
          placeholder="Last Name"
        />
        <input
          type="text"
          class="form-control"
          id="phone"
          placeholder="Phone Number"
        />
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
        />
        <input
          type="text"
          class="form-control"
          id="streetAdd"
          placeholder="Street Address"
        />
        <input
          type="text"
          class="form-control"
          id="aptNum"
          placeholder="Apartment Number"
        />
        <input
          type="text"
          class="form-control"
          id="city"
          placeholder="City"
        />
        <input
          type="text"
          class="form-control"
          id="state"
          placeholder="State/Province"
        />
        <input
          type="text"
          class="form-control"
          id="zip"
          placeholder="Zip/Postal Code"
        />
        <input
          type="text"
          class="form-control"
          id="country"
          placeholder="Country"
        />
        <input
          type="text"
          class="form-control"
          id="notes"
          placeholder="Customer Notes"
        />
    </template>
    <template #btn>
        <button
                class="btn btn-outline-danger"
              >Submit</button>
    </template>
  </modal>
</Teleport>

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
import Modal from '../components/Modal.vue'
export default {
    data() {
        return {
            customers: [],
            showModal: false
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
    components: {
    Modal
  },
};
</script>