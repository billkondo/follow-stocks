import NODE_ENV from './node_env';

type SqliteConfig = {
  DB_NAME: string;
};

const sqliteNodeEnvConfigs: { [key: string]: SqliteConfig } = {
  test: {
    DB_NAME: ':memory:',
  },
  development: {
    DB_NAME: 'database_dev.db',
  },
  production: {
    DB_NAME: 'database.db',
  },
};

const sqliteConfig = sqliteNodeEnvConfigs[NODE_ENV];

export default sqliteConfig;
