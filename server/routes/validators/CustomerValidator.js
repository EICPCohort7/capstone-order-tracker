/** Validator for checking customer constraints */
import { check } from 'express-validator';

export const validateCustomer = [
  check('email').isEmail().exists({
    checkNull: true,
    checkFalsy: true,
  }),
  check('firstName')
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isLength({
      min: 1,
      max: 45,
    })
    .isAlpha(),
  check('middleInitial').isLength({ max: 1 }).isAlpha(),
  check('lastName')
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isLength({
      max: 45,
    })
    .isAlpha(),
  check('phone').isMobilePhone().exists({
    checkNull: true,
    checkFalsy: true,
  }),
  check('customerNotes')
    .isLength({
      min: 0,
      max: 1024,
    })
    .isAlphanumeric(),
  // check('billingAddressId')
  //   .exists({
  //     checkNull: true,
  //     checkFalsy: true,
  //   })
  // .isInt(),
];
