'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Burguer Duplo',
        price: 25.90,
        path: 'burger_1.png',
        category_id: 1,
        offer: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Burguer Simples',
        price: 18.90,
        path: 'burger_2.png',
        category_id: 1,
        offer: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Burguer Premium',
        price: 32.90,
        path: 'burger_3.png',
        category_id: 1,
        offer: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Batata Frita',
        price: 12.90,
        path: 'appe_1.png',
        category_id: 2,
        offer: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: ' Onion Rings',
        price: 14.90,
        path: 'appe_2.png',
        category_id: 2,
        offer: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Refrigerante',
        price: 6.90,
        path: 'drink_1.png',
        category_id: 3,
        offer: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Suco Natural',
        price: 8.90,
        path: 'drink_2.png',
        category_id: 3,
        offer: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pudim',
        price: 10.90,
        path: 'dessert_1.png',
        category_id: 4,
        offer: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Sorvete',
        price: 9.90,
        path: 'dessert_2.png',
        category_id: 4,
        offer: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};

