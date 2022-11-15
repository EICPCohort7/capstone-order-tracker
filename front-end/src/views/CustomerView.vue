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
        <!-- Search button for the email field -->
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
    <!--Modal-->
    <button
      id="show-modal"
      class="btn btn-outline-danger"
      @click="showModal = true"
    >
      New Customer
    </button>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->

      <modal
        :show="showModal"
        @close="showModal = false"
        @form-submit="createCustomer"
      >
        <template #header>
          <h3>Create a new Customer</h3>
        </template>

        <template #body>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            class="form-control"
            placeholder="First Name (i.e. Jane)"
            required
          >
          <input
            id="middleInitial"
            v-model="middleInitial"
            type="text"
            class="form-control"
            placeholder="Middle Initial (i.e. M)"
          >
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            class="form-control"
            placeholder="Last Name"
            required
          >
          <input
            id="phone"
            v-model="phone"
            type="tel"
            class="form-control"
            placeholder="Phone Number (i.e. 1234567890)"
            required
            pattern="[0-9]{10}"
          >
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          >
          <input
            id="streetAdd"
            v-model="streetAdd"
            type="text"
            class="form-control"
            placeholder="Street Address"
            required
          >
          <input
            id="aptNum"
            v-model="aptNum"
            type="text"
            class="form-control"
            placeholder="Apartment Number"
          >
          <input
            id="city"
            v-model="city"
            type="text"
            class="form-control"
            placeholder="City"
            required
          >
          <input
            id="state"
            v-model="stateProv"
            type="text"
            class="form-control"
            placeholder="State/Province"
          >
          <input
            id="zip"
            v-model="zip"
            type="text"
            class="form-control"
            placeholder="Zip/Postal Code"
            required
          >
          <input
            id="country"
            v-model="country"
            type="text"
            class="form-control"
            placeholder="Country"
            required
          >
          <input
            id="notes"
            v-model="customerNotes"
            type="text"
            class="form-control"
            placeholder="Customer Notes"
          >
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
        <tr
          v-for="customer in customers"
          :key="customer.id"
        >
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
  <div />
</template>

<script>
import axios from 'axios';
import Modal from '../components/ModalForm.vue';
export default {
  name: 'App',

  components: {
    Modal,
  },
  data() {
    return {
      customers: [],
      firstName: '',
      middleInitial: '',
      lastName: '',
      phone: '',
      email: '',
      customerNotes: '',
      billingAddressId: '',
      orders: [],
      products: [],
      showModal: false,
    };
  },

  mounted: async function () {
    let customers = await axios
      .get('http://localhost:3000/api/v1/customers/')
      .catch((errors) => {
        console.log(errors); // Errors
      });
    this.customers = customers.data;
  },
  methods: {
    // The get method called by the function

    async getCustomers() {
      let customers = await axios
        .get('http://localhost:3000/api/v1/customers/')
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
    async createCustomer() {
      await axios
        .post('http://localhost:3000/api/v1/customers/', {
          firstName: this.firstName,
          middleInitial: this.middleInitial,
          lastName: this.lastName,
          phone: this.phone,
          email: this.email,
          customerNotes: this.customerNotes,
          billingAddressId: 1,
          isActive: 1,
        })
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customers = this.getCustomers().data;
    },
  },
};
</script>
