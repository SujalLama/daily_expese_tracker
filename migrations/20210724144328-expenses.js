'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expenses', { 
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('expenses');
  }
};
