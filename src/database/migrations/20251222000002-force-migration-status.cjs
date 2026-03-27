'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the migration is already marked as up
    const [results] = await queryInterface.sequelize.query(
      `SELECT * FROM "SequelizeMeta" WHERE name = '20251219051813-create-category-id.cjs'`,
    );

    if (results.length === 0) {
      // Insert the migration as already executed
      await queryInterface.sequelize.query(
        `INSERT INTO "SequelizeMeta" (name) VALUES ('20251219051813-create-category-id.cjs')`,
      );
    }
  },

  async down(queryInterface, Sequelize) {
    // No-op - don't remove the migration record
  },
};
