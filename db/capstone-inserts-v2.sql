INSERT INTO addresses (street, apt_num, city, state, zip, country) VALUES ("12 Main Street", "1", "Boston", "MA", "11111", "US");
INSERT INTO addresses (street, apt_num, city, state, zip, country) VALUES ("34 Main Street", "2", "New York", "NY", "22222", "US");
INSERT INTO addresses (street, apt_num, city, state, zip, country) VALUES ("56 Main Street", "3", "Los Angeles", "CA", "33333", "US");

INSERT INTO customers (first_name, middle_initial, last_name, phone, email, customer_notes, billing_address_id, is_active) VALUES ("John", "J", "Johnso", '1111111111', 'imjohn@john.john', 'Nothing ordered', 1, 1);
INSERT INTO customers (first_name, middle_initial, last_name, phone, email, customer_notes, billing_address_id, is_active) VALUES ("Bob", "B", "Bobbo", '2222222222', 'imbob@bob.bob', 'Nothing ordered', 2, 1);
INSERT INTO customers (first_name, middle_initial, last_name, phone, email, customer_notes, billing_address_id, is_active) VALUES ("Mike", "M", "Mikeo", '3333333333', 'immike@mike.mike', 'Nothing ordered', 3, 1);

INSERT INTO products (product_SKU, product_price, product_name, product_inventory, product_description) VALUES ("A1B3011", 55.3, "Crocs", 10, "Nice crocs");
INSERT INTO products (product_SKU, product_price, product_name, product_inventory, product_description) VALUES ("C1D6233", 99.99, "Sneakers", 20, "Adidas Sneakers");
INSERT INTO products (product_SKU, product_price, product_name, product_inventory, product_description) VALUES ("7Z41228", 19.99, "Plates", 30, "Set of plastic plates for eating");

INSERT INTO order_statuses (order_status_description) VALUES ("Order placed");
INSERT INTO order_statuses (order_status_description) VALUES ("Processing");
INSERT INTO order_statuses (order_status_description) VALUES ("Processed");

INSERT INTO orders (customer_id, order_status_code, order_placed, order_notes, shipping_address_id) VALUES (1, 1, "1900-01-01 00:00:00", "Notes", 1);
INSERT INTO orders (customer_id, order_status_code, order_placed, order_notes, shipping_address_id) VALUES (2, 2, "1900-01-01 00:00:00", "Notes", 2);
INSERT INTO orders (customer_id, order_status_code, order_placed, order_notes, shipping_address_id) VALUES (3, 3, "1900-01-01 00:00:00", "Notes", 3);

INSERT INTO order_details (order_id, product_id, product_quantity) VALUES (1, 1, 1);
INSERT INTO order_details (order_id, product_id, product_quantity) VALUES (2, 2, 4);
INSERT INTO order_details (order_id, product_id, product_quantity) VALUES (3, 3, 7);
