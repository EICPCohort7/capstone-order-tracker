<template>
    <div>
      <b-button v-b-modal.modal-prevent-closing>New Customer</b-button>
  
      <li v-for="customer in customers" :key="customer.id">
            {{ firstName }},
            {{ middleIntial }},
            {{ lastName }},
            {{ phone }},
            {{ email }},
            {{ streetAdd }},
            {{ aptNum }},
            {{ city }}
            {{ state }}
            {{ zip }}
            {{ country }}
            {{ notes }}
          </li>
  
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Name"
        
        <form ref="form" @submit.stop.prevent="createCustomer">
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="firstName"
              v-model="firstName"
              :state="nameState"
              placeholder="First Name"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </template>

<li v-for="customer in customers" :key="customer.id">
    {{ firstName }},
    {{ middleIntial }},
    {{ lastName }},
    {{ phone }},
    {{ email }},
    {{ streetAdd }},
    {{ aptNum }},
    {{ city }}
    {{ state }}
    {{ zip }}
    {{ country }}
    {{ notes }}
  </li>