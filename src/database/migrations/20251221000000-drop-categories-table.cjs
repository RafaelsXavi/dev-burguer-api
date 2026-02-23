'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, remove the foreign key constraint from products table
    await queryInterface.removeConstraint(
      'products',
      'products_category_id_fkey'
    );
    
    // Then drop the categories table
    await queryInterface.dropTable('categories');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  }
};
