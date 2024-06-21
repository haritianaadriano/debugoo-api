import { PostgreSqlContainer } from '@testcontainers/postgresql';

export const postgresContainer = async () => {
  return await new PostgreSqlContainer()
    .withPassword('password')
    .withDatabase('database')
    .withUsername('postgres')
    .start();
};
