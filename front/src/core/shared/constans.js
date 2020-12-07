export default {
  schema: 'http://',
  host: process.env.API_URL || 'localhost:3001',
  registration: '/register',
  login: '/login',
  name: '/user/name',
  newToken: '/refresh-token',
};
