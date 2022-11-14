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
       
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="First Name (i.e. Jane)"
              v-model="firstName"
              required
            />
            <input
              type="text"
              class="form-control"
              id="middleInitial"
              placeholder="Middle Initial (i.e. M)"
              v-model="middleInitial"
            />
            <input
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Last Name"
              v-model="lastName"
              required
            />
            <input
              type="tel"
              class="form-control"
              id="phone"
              placeholder="Phone Number (i.e. 1234567890)"
              v-model="phone"
              required
              pattern="[0-9]{10}"
            />
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              v-model="email"
              required
            />
            <input
              type="text"
              class="form-control"
              id="streetAdd"
              placeholder="Street Address"
              v-model="streetAdd"
              required
            />
            <input
              type="text"
              class="form-control"
              id="aptNum"
              placeholder="Apartment Number"
              v-model="aptNum"
            />
            <input
              type="text"
              class="form-control"
              id="city"
              placeholder="City"
              v-model="city"
              required
            />
            <input
              type="text"
              class="form-control"
              id="state"
              placeholder="State/Province"
              v-model="stateProv"
            />
            <input
              type="text"
              class="form-control"
              id="zip"
              placeholder="Zip/Postal Code"
              v-model="zip"
              required
            />
            <input
              type="text"
              class="form-control"
              id="country"
              placeholder="Country"
              v-model="country"
              required
            />
            <input
              type="text"
              class="form-control"
              id="notes"
              placeholder="Customer Notes"
              v-model="customerNotes"
            />
          
        </template>
        
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
      await axios
        .post(`http://localhost:3000/api/v1/customers/`, {
          firstName: this.firstName,
          middleInitial: this.middleInitial,
          lastName: this.lastName,
          phone: this.phone,
          email: this.email,
          customerNotes: this.customerNotes,
          billingAddressId: 1,
          isActive: 1
        })
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customers = this.getCustomers().data;
    },
  },

  components: {
     Modal
  },
};
</script>
