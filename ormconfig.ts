import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'hirelaba_db_user',
  password: 'User@123!',
  database: 'hirelaba_db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
};

export default config;
