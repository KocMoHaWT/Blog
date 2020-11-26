'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
      },
      password: {
        type: Sequelize.STRING(255),
      },
      role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      avatar: {
        type: Sequelize.STRING(255),
      },
      createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }
    })
  ,
  down: async (queryInterface, Sequelize) =>
    queryInterface.dropTable('Users')

};
