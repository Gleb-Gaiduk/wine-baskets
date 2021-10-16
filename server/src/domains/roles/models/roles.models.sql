CREATE TABLE IF NOT EXISTS role (
  role_id serial PRIMARY KEY,
  title VARCHAR(50) NOT NULL CHECK(title IN ('admin', 'customer', 'deliveryPerson', 'salesPerson')),
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_role (
 user_id INT REFERENCES "user" (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
 role_id INT REFERENCES role (role_id) ON UPDATE CASCADE ON DELETE CASCADE,
);