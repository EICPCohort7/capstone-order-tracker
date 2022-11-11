INSERT INTO products (product_SKU, product_price, product_name, product_inventory, product_description) VALUES ("A1B3011", 55.3, "Crocs", 23, "Nice crocs");

INSERT INTO customers (first_name, middle_name, last_name, phone, email, customer_notes, address) VALUES ("John", "Johny", "Johnso", '07985432123', 'imjohn@john.john', 'Nothing ordered', '24 John Street');

INSERT INTO customers (first_name, middle_name, last_name, phone, email, customer_notes, address) VALUES ("Bob", "Bobby", "Bobbo", '0798543223', 'imbob@bob.bob', 'Nothing ordered', '24 Bob Street');

INSERT INTO order_status (order_status_description) VALUES ("Order placed");

INSERT INTO orders (customer_id, order_status_code, datetime_order_placed, total_order_price) VALUES (1, 1, "1900-01-01 00:00:00", 55);

INSERT INTO order_details (order_id, product_id, product_quantity) VALUES (1, 1, 3);