'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('postFiles', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('Role');
  }
};
