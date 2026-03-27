'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if column exists before adding
    const tableDescription = await queryInterface.describeTable('categories');

    if (!tableDescription.path) {
      await queryInterface.addColumn('categories', 'path', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('categories', 'path');
  },
};
