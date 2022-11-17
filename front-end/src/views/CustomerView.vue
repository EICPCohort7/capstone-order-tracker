<template>
  <div class="customer">
    <!-- <img class="img" src="../assets/tjx-logo.png" alt="TJX logo" /> -->

    <h1 id="title">Customer Information</h1>
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
    <table id="customer-table" class="table table-striped">
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
          class="clickable-row"
          data-href=""
          @click="getInfo(customer.email)"
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

  <!-- Modal for customer information-->

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->

    <CustomerInformationModal
      :showing="showInfoModal"
      @xout="showInfoModal = false"
      @form-submit="updateCustomer(customerInfo[0].customerId)"
    >
      <template #header>
        <h3>Customer Information</h3>
      </template>

      <template #body>
        <div>
          <p>Customer ID: {{ customerInfo[0].customerId }}</p>
          <p>
            First name:<input
              id="editedFirst"
              v-model="editedFirst"
              type="text"
              class="form-control"
              placeholder="First name"
              required
            >
          </p>
          <p>
            Middle initial:<input
              id="editedInitial"
              v-model="editedInitial"
              type="text"
              class="form-control"
              placeholder="Middle initial"
            >
          </p>
          <p>
            Last name:<input
              id="editedLast"
              v-model="editedLast"
              type="text"
              class="form-control"
              placeholder="Last name"
              required
            >
          </p>
          <p>
            Phone number:<input
              id="editedPhone"
              v-model="editedPhone"
              type="tel"
              class="form-control"
              placeholder="Phone Number"
              required
            >
          </p>
          <p>
            Email address:<input
              id="editedEmail"
              v-model="editedEmail"
              type="email"
              class="form-control"
              placeholder="Email Address"
              required
            >
          </p>
          <p>
            Street Address: <input
              id="editedStreet"
              v-model="editedStreet"
              type="text"
              class="form-control"
              placeholder="Street Address"
              required
            >
          </p>
          <p>
            Apartment Number: <input
              id="editedAptNum"
              v-model="editedAptNum"
              type="text"
              class="form-control"
              placeholder="Apartment Number"
            >
          </p>
          <p>
            City: <input
              id="editedCity"
              v-model="editedCity"
              type="text"
              class="form-control"
              placeholder="City"
              required
            >
          </p>
          <p>
            State/Province: <input
              id="editedState"
              v-model="editedState"
              type="text"
              class="form-control"
              placeholder="State/Province"
            >
          </p>
          <p>
            Zip/Postal Code: <input
              id="editedZip"
              v-model="editedZip"
              type="text"
              class="form-control"
              placeholder="Zip code"
              required
            >
          </p>
          <p>
            Country: <input
              id="editedCountry"
              v-model="editedCountry"
              type="text"
              class="form-control"
              placeholder="Country"
              required
            >
          </p>
          <p>
            Customer Notes: <input
              id="editedNotes"
              v-model="editedNotes"
              type="text"
              class="form-control"
              placeholder="Customer Notes"
            >
          </p>
          <p>
            Customer Status: <input
              id="editedActiveStatus"
              v-model="editedActiveStatus"
              type="text"
              class="form-control"
              placeholder="Customer Status"
            >
          </p>
        </div>
      </template>
    </CustomerInformationModal>
  </Teleport>
</template>

<script>
import axios from 'axios';
import Modal from '../components/ModalForm.vue';
import CustomerInformationModal from '../components/CustomerInformationModal.vue';

export default {
  name: 'App',

  components: {
    Modal,
    CustomerInformationModal,
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
      showInfoModal: false,
      customerInfo: [],
      editedFirst: '',
      editedInitial: '',
      editedLast: '',
      editedPhone: '',
      editedEmail: '',
      editedStreet: '',
      editedAptNum: '',
      editedCity: '',
      editedState: '',
      editedZip: '',
      editedCountry: '',
      editedNotes: '',
      editedActiveStatus: '',
    };
  },

  mounted: async function () {
    let customers = await axios.get('http://localhost:3000/api/v1/customers/').catch((errors) => {
      console.log(errors); // Errors
    });
    this.customers = customers.data;
  },
  methods: {
    // The get method called by the function

    async getCustomers() {
      let customers = await axios.get('http://localhost:3000/api/v1/customers/').catch((errors) => {
        console.log(errors); // Errors
      });
      this.customers = customers.data;
    },

    async getEmail() {
      let customers = await axios
        .get(`http://localhost:3000/api/v1/customers/search?email=${this.emailValue}`)
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
    async getInfo(email) {
      this.showInfoModal = true;
      let customers = await axios
        .get(`http://localhost:3000/api/v1/customers/search?email=${email}`)
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customerInfo = customers.data;
      this.editedFirst = this.customerInfo[0].firstName;
      this.editedInitial = this.customerInfo[0].middleInitial;
      this.editedLast = this.customerInfo[0].lastName;
      this.editedPhone = this.customerInfo[0].phone;
      this.editedEmail = this.customerInfo[0].email;
      this.editedStreet = this.customerInfo[0].address.street;
      this.editedAptNum = this.customerInfo[0].address.aptNum;
      this.editedCity = this.customerInfo[0].address.city;
      this.editedState = this.customerInfo[0].address.state;
      this.editedZip = this.customerInfo[0].address.zip;
      this.editedCountry = this.customerInfo[0].address.country;
      this.editedNotes = this.customerInfo[0].customerNotes;
      this.editedActiveStatus = this.customerInfo[0].isActive;
    },
    async updateCustomer(id) {
      await axios
        .patch(`http://localhost:3000/api/v1/customers/${id}`, {
          firstName: this.editedFirst,
          middleInitial: this.editedInitial,
          lastName: this.editedLast,
          phone: this.editedPhone,
          email: this.editedEmail,
          address: {
            street: this.editedStreet,
            aptNum: this.editedAptNum,
            city: this.editedCity,
            state: this.editedState,
            zip: this.editedZip,
            country: this.editedCountry,
          },
          customerNotes: this.editedNotes,
          isActive: this.editedActiveStatus,
        })
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.customers = this.getCustomers().data;
    },
  },
};
</script>

<style>
#create-customer {
float:right;
margin-right: 100px;
}
#title{
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 100px;
  color: #9b0c23;
}
#customer-table{
  border: 2px solid;
  border-radius: 10px;

}
</style>
