<template>
  <div class="customer">
    <img class="img" src="../assets/tjx-logo.png" alt="TJX logo" />

    <h1>Customer Information</h1>
  </div>
  <div class="form-group">
    <form id="searching">
      <div class="form-group">
        <input
          v-model="emailValue"
          type="search"
          class="form-control"
          id="email"
          placeholder="Email"
        />
        <!--Search button for the email field-->
        <button
          type="button"
          class="btn btn-outline-danger"
          v-on:click="getEmail"
        >
          Search
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          v-on:click="getCustomers"
        >
          Get All
        </button>
      </div>
    </form>
    <!--Modal-->
    <button id="show-modal" @click="showModal = true" class="btn btn-outline-danger">New Customer</button>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
    
      <modal :show="showModal" @close="showModal = false" @form-submit="createCustomer">
        <template #header>
          <h3>Create a new Customer</h3>
        </template>
        
        <template #body>
          <!-- <form ref="form" @submit="createCustomer">  </form>   -->   
       
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="First Name"
              v-model="firstName"
              
            />
            <input
              type="text"
              class="form-control"
              id="middleInitial"
              placeholder="Middle Initial"
              v-model="middleInitial"
            />
            <input
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Last Name"
              v-model="lastName"
            />
            <input
              type="text"
              class="form-control"
              id="phone"
              placeholder="Phone Number"
              v-model="phone"
            />
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              v-model="email"
            />
            <input
              type="text"
              class="form-control"
              id="streetAdd"
              placeholder="Street Address"
              v-model="billingAddressId"
            />
            <input
              type="text"
              class="form-control"
              id="aptNum"
              placeholder="Apartment Number"
              v-model="phone"
            />
            <input
              type="text"
              class="form-control"
              id="city"
              placeholder="City"
              v-model="phone"
            />
            <input
              type="text"
              class="form-control"
              id="state"
              placeholder="State/Province"
              v-model="phone"
            />
            <input
              type="text"
              class="form-control"
              id="zip"
              placeholder="Zip/Postal Code"
              v-model="phone"
            />
            <input
              type="text"
              class="form-control"
              id="country"
              placeholder="Country"
              v-model="phone"
            />
            <input
              type="text"
              class="form-control"
              id="notes"
              placeholder="Customer Notes"
              v-model="customerNotes"
            />
          
        </template>
        <!-- <template>
           <button
              type="submit"
              class="btn btn-outline-danger"
              v-on:submit="createCustomer"
            >
              Submit
            </button> 
        </template> -->
        
      </modal>
    </Teleport>

    <!--Data Table-->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Customer ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Middle Initial</th>
          <th scope="col">Last Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
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
  <div></div>
</template>

<script>
import axios from "axios";
import Modal from '../components/Modal.vue'
export default {
  data() {
    return {
      customers: [],
      firstName: "",
      middleInitial: "",
      lastName: "",
      phone: "",
      email: "",
      customerNotes: "",
      billingAddressId: "",
      orders: [],
      products: [],
       showModal: false
    };
  },

  mounted: async function () {
    let customers = await axios
      .get(`http://localhost:3000/api/v1/customers/`)
      .catch((errors) => {
        console.log(errors); // Errors
      });
    this.customers = customers.data;
  },
  name: "App",
  methods: {
    // The get method called by the function

    async getCustomers() {
      let customers = await axios
        .get(`http://localhost:3000/api/v1/customers/`)
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customers = customers.data;
    },

    async getEmail() {
      let customers = await axios
        .get(
          `http://localhost:3000/api/v1/customers/search?email=${this.emailValue}`
        )
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customers = customers.data;
    },
    async createCustomer() {
      console.log("hello");
      let customers = await axios
        .post(`http://localhost:3000/api/v1/customers/`, {
          firstName: this.firstName,
          middleInitial: this.middleInitial,
          lastName: this.lastName,
          phone: this.phone,
          email: this.email,
          customerNotes: this.customerNotes,
          billingAddressId: 1,
        })
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customers = customers.data;
    },
  },

  components: {
     Modal
  },
};
</script>
