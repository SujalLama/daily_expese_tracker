'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('expenses', 'creator', { 
      type: Sequelize.INTEGER ,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('expenses', 'creator');
  }
};
