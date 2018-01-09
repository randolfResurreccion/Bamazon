

DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(11),
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("stereo", "electronics", 249.99, 300);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("walkman", "electronics", 49.99, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("betamax", "electronics", 149.99, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("peacoat", "clothing", 300.00, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("jeans", "clothing", 75.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("shirt", "clothing", 30.00, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("smart_watch", "accessories", 150.00, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("scarf", "accessories", 25.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("socks", "accessories", 9.99, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("condoms", "misc", 1.50, 1000);