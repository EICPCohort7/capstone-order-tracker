/** Validator for checking customer constraints */
import { check } from 'express-validator';

// Customer validation has been implemented, still need to do address part of customer
// Could also go a little more detailed into some of them. For example, a street can contain
// alphanumeric characters, space characters, and periods. The documentation says there is a way
// of using isAlpha/isAlphanumeric to do this but it kept causing errors. It's not a big deal and
// not a priority getting this fixed.

export const validateCustomer = [
  // customer part
  check('firstName')
    .exists({
      checkFalsy: true,
    })
    .isString()
    .isLength({
      min: 1,
      max: 45,
    })
    .isAlpha(),
  check('middleInitial')
    .exists()
    .if((value, { req }) => req.body.middleInitial !== '' && req.body.middleInitial !== null)
    .isString()
    .isLength({ max: 1 })
    .isAlpha(),
  check('lastName')
    .exists({
      checkFalsy: true,
    })
    .isString()
    .isLength({
      min: 1,
      max: 45,
    })
    .isAlpha(),
  check('phone')
    .exists({
      checkFalsy: true,
    })
    .isString()
    .isMobilePhone(),
  check('email')
    .exists({
      checkFalsy: true,
    })
    .isString()
    .isEmail()
    .isLength({
      min: 1,
      max: 45,
    }),
  check('customerNotes')
    .exists()
    .if((value, { req }) => req.body.customerNotes !== '' && req.body.customerNotes !== null)
    .isString()
    .isLength({
      max: 1024,
    }),
  // address part - need to check in with frontend to see if more needs to be done.
  check('address.street')
    .exists({
      checkFalsy: true,
    })
    .isString()
    .isLength({
      min: 1,
      max: 255,
    }),
  check('address.aptNum')
    .exists()
    .if((value, { req }) => req.body.address.aptNum !== '' && req.body.address.aptNum !== null)
    .isString()
    .isLength({
      max: 10,
    }),
  check('address.city')
    .exists({
      checkFalsy: true,
    })
    .isString()
    .isLength({
      min: 1,
      max: 45,
    }),
  check('address.state')
    .exists()
    .if((value, { req }) => req.body.address.state !== '' && req.body.address.state !== null)
    .isString()
    .isLength({
      max: 45,
    }),
  check('address.zip')
    .exists({
      checkFalsy: true,
    })
    .isString()
    .isLength({
      min: 1,
      max: 15,
    }),
  check('address.country')
    .exists({
      checkFalsy: true,
    })
    .isString()
    .isLength({
      min: 1,
      max: 45,
    }),
];
