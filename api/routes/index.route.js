const express = require('express'),
      usersRoutes = require('./users.route'),
      messagesRoutes = require('./messages.route'),
      authRoutes = require('./auth.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at api/users
router.use('/users', usersRoutes);

// mount user routes at api/messages
router.use('/messages', messagesRoutes);

// mount auth routes at api/
router.use('/', authRoutes);

module.exports = router;
