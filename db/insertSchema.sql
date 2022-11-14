insert into capstone_ots.addresses (address_id, street, apt_num, city, state, zip, country)values (1,'lincoln street','45','Toronto','ON','K1K Z4Z', 'Canada'),
(2,'1223 lion ave', 'unit 102', 'Calgary', 'Alberta', 'N1H ABC', 'Canada'),
(3, '300 West fork drive', null ,'Deerfield  beach', 'FL', '33442', 'US'),
(4, '10 park st', '11','Brighouse', 'Calderdale', 'HD6 1AD', 'United Kingdom'),
(5, '1392 Walnut Hill drive',null,'Cincinnati','OH','45229','United States'),
(6, '44 White Rd',null,'Philadelphia','PA','19102','United States');


insert into capstone_ots.customers (customer_id, first_name, middle_initial, last_name, phone, email, customer_notes, billing_address_id) 
values (1, 'Steven','A','Park','(558) 402-1342','stevepark@gmail.com','customer has file complaint before',1),
(2, 'Denim', null, 'Rob', '123-123-9999','denimrob@ymail.com', null, 2),
(3, 'James', 'B', 'Case', '666-123-6025','jamesy@hotmail.com', 'Customer is very good at feedbacks', 3),
(4, 'Jenny', null, 'nolan', '+1 975-122-6025','jenny12@icloud.com', null, 4),
(5, 'Tom', 'C', 'johnson','(333) 345-291','Tomc@gmail.com','has cancelled order several times previously',5);

insert into capstone_ots.order_statuses(order_status_code, order_status_description)
values(1, 'Draft'),(2, 'Order Placed'), (3, 'In Transit'), (4, 'Delivered'), (5, 'Canceled');





insert into capstone_ots.orders(order_id, customer_id, order_status_code, order_placed, order_notes, shipping_address_id)
values(1, 1, 1, '2022-11-12 6:15', 'order delivery delayed to 2022-11-20', null),
(2, 2, 2, '2022-11-10 6:30', 'order delivery delayed', 2),
(3, 3, 2, '2022-11-9 8:30', 'black sweater to ship in seperate order', 3),
(4, 4, 2, '2022-11-12 12:15', null, 5),
(5, 5, 2, '2022-11-10 3:55', null, 6);




insert into capstone_ots.Products (product_id, product_SKU, product_price, product_name, product_inventory, product_description) values
(1, 'DEN-BLU-MEN', 31.99, 'Denim Pant', 1, 'Blue Denim Pants'),
(2, 'KNI-BLA-WOM', 26.30, 'Knit Sweater', 2, 'Black Knit Sweater'),
(3, 'SAL-KIT-HOM', 14.99, 'Shaker Set', 3, 'Salt and Pepper Shaker Set'),
(4, 'CAN-MUL-JUN', 49.99, 'Canvas Slides', 4, 'Rainbow Canvas Slides'),
(5, 'DES-SIL-HOM', 61.54, 'Desk Lamp', 5, 'Silver Desk Lamp');




insert into capstone_ots.Order_details (order_details_id, order_id, product_id, product_quantity) values
(1, 1, 2, 5),
(2, 2, 1, 6),
(3, 3, 2, 7),
(4, 4, 3, 5),
(5, 5, 4, 2);