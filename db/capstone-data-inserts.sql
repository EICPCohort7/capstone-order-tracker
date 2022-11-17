INSERT INTO addresses (street, apt_num, city, state, zip, country) VALUES ("Street", "1", "City", "State", "ZIP", "Country");

INSERT INTO products (product_SKU, product_price, product_name, product_inventory, product_description) VALUES ("A1B3011", 55.3, "Crocs", 23, "Nice crocs");

INSERT INTO customers (first_name, middle_initial, last_name, phone, email, customer_notes, billing_address_id, is_active) VALUES ("John", "J", "Johnso", '07985432123', 'imjohn@john.john', 'Nothing ordered', 1, 1);
INSERT INTO customers (first_name, middle_initial, last_name, phone, email, customer_notes, billing_address_id, is_active) VALUES ("Bob", "B", "Bobbo", '0798543223', 'imbob@bob.bob', 'Nothing ordered', 1, 1);

INSERT INTO order_status (order_status_description) VALUES ("Order placed");
INSERT INTO order_status (order_status_description) VALUES ("Processing");
INSERT INTO order_status (order_status_description) VALUES ("Processed");

INSERT INTO orders (customer_id, order_status_code, order_placed, order_notes, shipping_address_id) VALUES (1, 1, "1900-01-01 00:00:00", "Notes", 1);

INSERT INTO order_details (order_id, product_id, product_quantity) VALUES (1, 1, 3);
