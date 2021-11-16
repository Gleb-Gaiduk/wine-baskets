CREATE TABLE Product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_path TEXT NOT NULL,
  item_price NUMERIC(4,2) NOT NULL,
  product_category_id INTEGER NOT NULL,
  FOREIGN KEY(product_category_id) REFERENCES ProductCategory(id)
);

CREATE TABLE ProductCategory(
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

INSERT INTO ProductCategory (category_name) VALUES ('wine'),('chocolate'),('cheese');

CREATE TABLE ProductPropertyType(
  id SERIAL PRIMARY KEY,
  property_type VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE ProductProperty(
  id SERIAL PRIMARY KEY,
  property_name VARCHAR(255) UNIQUE NOT NULL,
  property_description TEXT NULL,
  property_type_id INTEGER NOT NULL,
  FOREIGN KEY (property_type_id) REFERENCES ProductPropertyType(id)
);

CREATE TABLE ProductCategory_ProductPropertyType (
 product_category_id INT REFERENCES ProductCategory (id) ON UPDATE CASCADE ON DELETE CASCADE,
 product_property_type_id INT REFERENCES ProductPropertyType (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ProductCategory_Product (
 product_category_id INT REFERENCES ProductCategory (id) ON UPDATE CASCADE ON DELETE CASCADE,
 product_id INT REFERENCES Product (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ProductProperty_Product (
 product_property_id INT REFERENCES ProductProperty (id) ON UPDATE CASCADE ON DELETE CASCADE,
 product_id INT REFERENCES Product (id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT property_type, property_name, property_description FROM ProductPropertyType INNER JOIN ProductProperty ON ProductPropertyType.id = ProductProperty.property_type_id WHERE ProductProperty.id IN (SELECT product_property_id FROM ProductProperty_Product WHERE product_id=$1);