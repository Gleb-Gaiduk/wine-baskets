CREATE TABLE IF NOT EXISTS "user" (
  user_id serial PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(255) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  activation_link VARCHAR NOT NULL,
  is_activated BOOLEAN DEFAULT FALSE
);