const path = require('path');
const { db } = require('../models/index');

const express = require('express');
const passport = require('../middleware/checkRefresh');
const authControler = require('../controllers/authorizationController');

const router = express.Router();

router.post('/login', authControler.authorization);

router.post('/register', authControler.registration);

router.post('/refresh-token', authControler.getNewRefreshToken);

router.get('/user/name', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const { user } = req;
  return res.status(200).json({ name: user.name});
})

module.exports = router;
