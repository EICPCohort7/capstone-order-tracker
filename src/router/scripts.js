import axios from "axios";

let customer_uri = "http://loclhost:3000/api/v1/customers/";

const actions = {
    async fetchCustomers({ get:all}) {
        let allActive = await axios.get(customer_uri);
        let customerData = allActive.data
    }
}