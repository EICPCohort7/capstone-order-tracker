drop schema if exists Capstone_OTS;

Create schema capstone_OTS;

CREATE TABLE IF NOT EXISTS `Capstone_OTS`.`Addresses` (
  `address_id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NOT NULL,
  `apt_num` VARCHAR(10) NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NULL,
  `zip` VARCHAR(15) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`address_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Capstone_OTS`.`Customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `middle_initial` VARCHAR(1) NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `customer_notes` VARCHAR(1024) NULL,
  `billing_address_id` INT NOT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`customer_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `address_id_idx` (`billing_address_id` ASC) VISIBLE,
  CONSTRAINT `address_id`
    FOREIGN KEY (`billing_address_id`)
    REFERENCES `Capstone_OTS`.`Addresses` (`address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Capstone_OTS`.`Order_statuses` (
  `order_status_code` INT NOT NULL AUTO_INCREMENT,
  `order_status_description` VARCHAR(45) NULL,
  PRIMARY KEY (`order_status_code`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Capstone_OTS`.`Orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `order_status_code` INT NOT NULL,
  `order_placed` DATETIME NULL,
  `order_notes` VARCHAR(1024) NULL,
  `shipping_address_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `customer_id_idx` (`customer_id` ASC) VISIBLE,
  INDEX `order_status_code_idx` (`order_status_code` ASC) VISIBLE,
  INDEX `shipping_address_id_idx` (`shipping_address_id` ASC) VISIBLE,
  CONSTRAINT `customer_id`
    FOREIGN KEY (`customer_id`)
    REFERENCES `Capstone_OTS`.`Customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_status_code`
    FOREIGN KEY (`order_status_code`)
    REFERENCES `Capstone_OTS`.`Order_statuses` (`order_status_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipping_address_id`
    FOREIGN KEY (`shipping_address_id`)
    REFERENCES `Capstone_OTS`.`Addresses` (`address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `Capstone_OTS`.`Products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_SKU` VARCHAR(45) NOT NULL,
  `product_price` FLOAT NOT NULL,
  `product_name` VARCHAR(150) NOT NULL,
  `product_inventory` INT NOT NULL,
  `product_description` VARCHAR(255) NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Capstone_OTS`.`Order_details` (
  `order_details_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_quantity` INT NULL,
  PRIMARY KEY (`order_details_id`),
  INDEX `order_id_idx` (`order_id` ASC) VISIBLE,
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `Capstone_OTS`.`Orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `Capstone_OTS`.`Products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
