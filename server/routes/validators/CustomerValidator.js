/** Validator for checking customer constraints */
import { body, check } from 'express-validator';

export const validateCustomer = [
  check('email')
    .exists({
      checkFalsy: true,
    })
    .isEmail()
    .isLength({
      min: 1,
      max: 45,
    }),
  check('firstName')
    .exists({
      checkFalsy: true,
    })
    .isLength({
      min: 1,
      max: 45,
    })
    .isAlpha(),
  check('middleInitial')
    .if(body('middleInitial').exists())
    .isLength({ max: 1 })
    .isAlpha(),
  check('customerNotes')
    .if(body('customerNotes').exists())
    .isLength({
      max: 1024,
    }),
  check('lastName')
    .exists({
      checkFalsy: true,
    })
    .isLength({
      min: 1,
      max: 45,
    })
    .isAlpha(),
  check('phone')
    .exists({
      checkFalsy: true,
    })
    .isMobilePhone(),
];
