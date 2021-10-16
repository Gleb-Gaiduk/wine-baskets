CREATE TABLE IF NOT EXISTS token (
  user_id INT REFERENCES "user" (user_id) ON DELETE CASCADE,
  refresh_token VARCHAR NOT NULL
);