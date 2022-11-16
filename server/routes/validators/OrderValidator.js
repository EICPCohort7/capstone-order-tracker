/** Validator for checking order constraints */
import { body, check } from 'express-validator';

export const validateOrder = [
  check('customerId')
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .not().isString()
    .isInt(),
  check('orderStatusCode')
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .not().isString()
    .isInt()
    .isIn([1, 2, 3, 4, 5]),
  check('orderNotes')
    .if(body('orderNotes').exists())
    .isLength({
      max: 1024,
    }),
  check('shippingAddressId')
    .not().isString()
    .isInt(),
];
