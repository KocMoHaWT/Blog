const path = require('path');
const { User } = require('../models/index');

const express = require('express');

const router = express.Router();

router.get('/user', async (req, res, next) => {
  console.log('ahdslkajhldkHJkldhljHDJKLhajd');

  await User.create({first_name: 'vlad', last_name: 'Dontsov', email: 'dksdljflkjdsf'});
  res.send('Hello World');
  res.end();
})

module.exports = router;
