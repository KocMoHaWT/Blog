const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../.env')});

module.exports  = {
  secretKey: process.env.secretKey || 'secret',
  refreshExpire: process.env.refreshExpire || 250,
  accessExpire: process.env.accessExpire || 10,
  host: process.env.host || 'root' ,
  password: process.env.password || 'root',
  username: process.env.username || 'root',
  database: process.env.database || 'blog',
  port: process.env.PORT || 3001,
}
