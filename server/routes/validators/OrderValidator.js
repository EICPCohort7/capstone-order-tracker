/** Validator for checking order constraints */
import { body, check } from 'express-validator';

export const validateOrder = [
  check('customerId')
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isInt(),
  check('orderStatusCode')
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isIn([1, 2, 3, 4, 5]),
  // check('orderPlaced')
  //   .isLength({ max: 1 }), // isDate?
  check('orderNotes')
    .if(body('orderNotes').exists())
    .isLength({
      max: 1024,
    }),
  check('shippingAddressId')
    .isInt(),
];
