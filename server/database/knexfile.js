module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'opga',
      user: 'admin',
      password: 'admin',
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
  },
};
