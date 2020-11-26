module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Vladiko',
      email: 'vladiko@vladiko.om',
      password: '$2y$10$1leTSx0vgZk85jLzmwkL4enttp7otAWi6HQ23d6HkFC4G2J.IId.G ',
      role_id: '3'
    }, {
      name: 'Vladisto',
      email: 'vladisto-tripisto@bad.com',
      password: '$2a$10$Zz2Kv/7uT4m6Fef1ZjzVp.wGb0fCGDdYkFUrPEg9X1AFcHQeK2wU6',
      role_id: '2'
    },{
      name: 'KocMoHaWT',
      email: 'kocmonawt@bad.com',
      password: '$2a$10$Zz2Kv/7uT4m6Fef1ZjzVp.wGb0fCGDdYkFUrPEg9X1AFcHQeK2wU6',
      role_id: '1'
    },
      {
        name: 'GOD',
        email: 'god@total.nocom',
        password: '$2a$10$Zz2Kv/7uT4m6Fef1ZjzVp.wGb0fCGDdYkFUrPEg9X1AFcHQeK2wU6',
        role_id: '3'
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
