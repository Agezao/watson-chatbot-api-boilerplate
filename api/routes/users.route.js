const express = require('express'),
      validate = require('express-validation'),
      paramValidation = require('../../server-setup/param-validation'),
      userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
  /** GET /api/users - Get user */
  .get(userCtrl.get)

  /** PUT /api/users - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users - Delete user */
  .delete(userCtrl.remove);

router.route('/:userId')
  /** GET /api/:userId/users - Get specific user */ 
  .get(userCtrl.get);

module.exports = router;
