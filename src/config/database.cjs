module.exports = {
  development: {
    username: 'admin',
    password: '081327',
    database: 'devburguer-db',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    username: 'admin',
    password: '081327',
    database: 'devburguer-test-db',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    username: 'admin',
    password: '081327',
    database: 'devburguer-prod-db',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
