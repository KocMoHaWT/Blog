export default {
  schema: 'https://',
  host: process.env.API_URL || 'simple-test-blog.herokuapp.com',
  registration: '/register',
  login: '/login',
  name: '/user/name',
  newToken: '/refresh-token',
};
