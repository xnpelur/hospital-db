CREATE TABLE query (
  id SERIAL UNIQUE,
  function_name VARCHAR(255) UNIQUE,
  title VARCHAR(255),
  description VARCHAR(255),
  with_parameters BOOLEAN,
  columns JSONB
);
