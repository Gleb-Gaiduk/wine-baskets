CREATE TABLE ProductCategory(
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

INSERT INTO ProductCategory (category_name) VALUES ('wine'),('chocolate'),('cheese');