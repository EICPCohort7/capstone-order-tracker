<template>
  <div class="product">
    <h1 id="title2">Product Information</h1>
  </div>
  <div class="form-group">
    <form id="searching">
      <div class="form-group">
        <input
          id="productId"
          v-model="productId"
          type="number"
          class="form-control"
          placeholder="Product ID"
        >
        <button
          type="button"
          class="btn btn-outline-danger get-all"
          @click="getProducts"
        >
          Get All Products
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="getProductId"
        >
          Search
        </button>
      </div>
    </form>
  </div>
  <!--Data Table-->
  <table
    id="products-table"
    class="table table-striped"
  >
    <caption>Products Table</caption>
    <thead>
      <tr>
        <th scope="col">Product ID</th>
        <th scope="col">Product SKU</th>
        <th scope="col">Product Name</th>
        <th scope="col">Product Price</th>
        <th scope="col">Inventory</th>
        <th scope="col">Product Descrption</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
      >
        <td scope="row">{{ product.productId }}</td>
        <td>{{ product.productSku }}</td>
        <td>{{ product.productName }}</td>
        <td>{{ product.productPrice }}</td>
        <td>{{ product.productInventory }}</td>
        <td>{{ product.productDescription }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      products: [],

    };
  },

  mounted: async function () {
    let products = await axios.get('/api/v1/products/')
      .catch((errors) => {
        console.log(errors); // Errors
      });
    this.products = products.data;
  },
  methods: {
    async getProducts() {
      let products = await axios.get('/api/v1/products/')
        .catch((errors) => {
          console.log(errors); // Errors
        });
      this.products = products.data;
    },

    async getProductId() {
      let products = await axios.get(`/api/v1/products/${this.productId}`)
        .catch((errors) => {
          console.log(errors); // Errors
          alert(`Looks like there aren't any products that match "${this.productId}". Try again!`);
        });
      this.products = [products.data];
    },

  },
};
</script>
 <style>
#title2{
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 100px;
  color: #9b0c23;
}
#products-table{
  border: 2px solid;
  border-radius: 10px;
}
.get-all {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
