<template>
  <div class="customer">
    <img class="img" src="../assets/tjx-logo.png" alt="TJX logo" />

    <h1>Customer Information</h1>
    
<form id = "searching">
  <div class="form-group">
    <input type="search" class="form-control" id="entercid" placeholder="Customer ID">
  </div>
  <div class="form-group">

    <input type="search" class="form-control" id="firstname" placeholder="First Name">
  </div>
  <div class="form-group">
    <input type="search" class="form-control" id="lastname" placeholder="Last Name">
  </div>
  <div class="form-group">
    <input type="search" class="form-control" id="email" placeholder="Email">
  </div>
  <button type="button" class="btn btn-outline-danger">Seach</button>
</form>

<button type="button" class="btn btn-outline-danger">Create Customer</button>

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
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>S</td>
      <td>Twain</td>
      <td>456</td>
      <td>456</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>T</td>
      <td>Johnson</td>
      <td>456</td>
      <td>456</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>B</td>
      <td>Ladle</td>
      <td>456</td>
      <td>456</td>
    </tr>
  </tbody>
</table>



  </div>
</template>
