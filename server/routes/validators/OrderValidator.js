/** Validator for checking order constraints */
import { check } from 'express-validator';

export const validateOrder = [
  check('customerId')
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isInt(),
  check('orderStatusCode') // check that it's only 1-5?
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isInt(),
  check('orderPlaced')
    .isLength({ max: 1 }), // isDate?
  check('orderNotes')
    .isLength({
      max: 1024,
    }),
  check('shippingAddressId')
    .isInt(),
];
