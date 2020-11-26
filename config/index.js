const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../.env')});

module.exports  = {
  secretKey: process.env.secretKey,
  refreshExpire: process.env.refreshExpire,
  accessExpire: process.env.accessExpire
}