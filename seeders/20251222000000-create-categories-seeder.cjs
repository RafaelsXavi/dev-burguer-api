'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Lanches',
        path: 'category_1.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Acompanhamentos',
        path: 'category_2.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bebidas',
        path: 'category_3.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Sobremesas',
        path: 'category_4.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};

