CREATE DATABASE tasksdb;

CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE, //para que sea unico
  description VARCHAR(255)
);

CREATE TABLE users(
  email VARCHAR(255),
  password VARCHAR(255)
);