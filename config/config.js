const config = require('config');

module.exports = {
  development: {
    username: process.env.mariadb_user,
    password: process.env.mariadb_password,
    database: process.env.mariadb_name,
    host: process.env.mariadb_host,
    dialect: 'mariadb',
    logging: true
  },
  'development-compose': {
    username: process.env.mariadb_user,
    password: process.env.mariadb_password,
    database: process.env.mariadb_name,
    host: process.env.mariadb_host,
    dialect: 'mariadb',
    logging: true
  },
  production: {
    username: process.env.mariadb_user,
    password: process.env.mariadb_password,
    database: process.env.mariadb_name,
    host: process.env.mariadb_host,
    dialect: 'mariadb',
    logging: true
  },
  devel_openshift: {
    username: process.env.mariadb_user,
    password: process.env.mariadb_password,
    database: process.env.mariadb_name,
    host: process.env.mariadb_host,
    dialect: 'mariadb',
    logging: true
  }
};
