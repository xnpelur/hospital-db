CREATE TABLE query (
  id SERIAL UNIQUE,
  function_name VARCHAR(255) UNIQUE,
  title VARCHAR(255) UNIQUE,
  description VARCHAR(255) UNIQUE,
  columns JSONB
);
