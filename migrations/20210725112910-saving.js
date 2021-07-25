'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('savings', { 
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        }
      }
    }, {timestamps: false});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('savings');
  }
};
