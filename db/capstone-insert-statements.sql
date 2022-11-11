
insert into capstone_ots.addresses (address_id, street, apt_num, city, state, zip, country)values (1,'lincoln street','45','Toronto','ON','K1K Z4Z', 'Canada'),
(2,'1223 lion ave', 'unit 102', 'Calgary', 'Alberta', 'N1H ABC', 'Canada'),
(3, '300 West fork drive', null ,'Deerfield  beach', 'FL', '33442', 'US'),
(4, '10 park st', '11','Brighouse', 'Calderdale', 'HD6 1AD', 'United Kingdom'),
(5, '1392 Walnut Hill drive',null,'Cincinnati','OH','45229','United States');



insert into capstone_ots.customers (customer_id, first_name, middle_initial, last_name, phone, email, customer_notes, billing_address_id, is_active) 
values (1, 'Steven','A','Park','(558) 402-1342','stevepark@gmail.com','customer has file complaint before',1,true ),
(2, 'Denim', null, 'Rob', '123-123-9999','denimrob@ymail.com', null, 2,true),
(3, 'James', 'B', 'Case', '666-123-6025','jamesy@hotmail.com', 'Customer is very good at feedbacks', 3, true),
(4, 'Jenny', null, 'nolan', '+1 975-122-6025','jenny12@icloud.com', null, 4, true),
(5, 'Tom', 'C', 'johnson','(333) 345-291','Tomc@gmail.com','has cancelled order several times previously',5,true);

