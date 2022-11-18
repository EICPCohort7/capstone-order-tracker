
<template>
  <div class="orders">
    <h1 id="title1">Order Information</h1>
  </div>
  <div class="form-group">
    <form id="searching">
      <div class="form-group">
        <input
          id="orderId"
          v-model="orderId"
          type="number"
          class="form-control"
          placeholder="Order ID"
        >
        <!--Search button for the Order Id field-->
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="getOrderId"
        >
          Search
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="getOrders"
        >
          Get All Orders
        </button>
      </div>
    </form>
  </div>
  <!--Data Table-->
  <table
    id="orders-table"
    class="table table-striped"
  >
    <caption>Orders Table</caption>
    <thead>
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Customer ID</th>
        <th scope="col">Order Placed</th>
        <th scope="col">Order Status Code</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="order in orders"
        :key="order.id"
      >
        <!--Change these to proper fields-->
        <td scope="row">{{ order.orderId }}</td>
        <td>{{ order.customerId }}</td>
        <td>{{ order.orderPlaced }}</td>
        <td>{{ order.orderStatusCode }}</td>
      </tr>
    </tbody>
  </table>
  <div />
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      orders: [],

    };
  },

  mounted: async function () {
    let orders = await axios.get('/api/v1/orders/')
      .catch((errors) => {
        console.log(errors); // Errors
      });
    this.orders = orders.data;
  },
  methods: {
    // The get method called by the function

    async getOrders() {
      let orders = await axios.get('/api/v1/orders/')
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.orders = orders.data;
    },

    async getOrderId() {
      let orders = await axios.get(`/api/v1/orders/${this.orderId}`)
        .catch((errors) => {
          console.log(errors); // Errors
          alert(`Looks like there aren't any orders that match "${this.orderId}". Try again!`);
        });
      this.orders = [orders.data];
    },

  },
};
</script>

<style>

#title1{
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 100px;
  color: #9b0c23;
}
#orders-table{
  border: 2px solid;
  border-radius: 10px;

}
</style>
