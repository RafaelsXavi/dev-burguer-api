'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn('products', 'category-id', 'category_id');
  },

  async down (queryInterface) {
    await queryInterface.renameColumn('products', 'category_id', 'category-id');
  }
};
