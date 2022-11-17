import { rest } from 'msw';

let customers = [
  {
    customerId: 1,
    firstName: 'Fake #1',
    middleInitial: '',
    lastName: 'Customer',
    phone: '123-456-7890',
    email: 'fake@fakity.com',
    address: {
      street: 'street',
      aptNum: 1,
      city: 'city',
      state: 'state',
      zip: 'A1A 1A1',
      country: 'Canada',
    },
    customerNotes: 'notes',
  },
  {
    customerId: 2,
    firstName: 'Fake #2',
    middleInitial: '',
    lastName: 'Customer',
    phone: '0987654321',
    email: 'not@really.com',
    address: {
      street: 'street',
      aptNum: 1,
      city: 'city',
      state: 'state',
      zip: 'A1A 1A1',
      country: 'Canada',
    },
    customerNotes: 'notes',
  },
];
export const handlers = [
  rest.get('http://localhost:3000/api/v1/customers', (req, res, context) => {
    return res(context.status(200), context.json(customers));
  }),
  rest.get('http://localhost:3000/api/v1/customers/search', (req, res, context) => {
    const emailVal = req.url.searchParams.get('email');

    let search = customers.find((obj) => {
      return obj.email === emailVal;
    });

    return res(context.status(200), context.json([search]));
  }),
];
