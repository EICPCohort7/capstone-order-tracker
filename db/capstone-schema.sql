-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------orders
DROP SCHEMA IF EXISTS `capstone-dummy` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `capstone-dummy` DEFAULT CHARACTER SET utf8 ;
USE `capstone-dummy` ;

-- -----------------------------------------------------
-- Table `mydb`.`Customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `capstone-dummy`.`Customers` ;

CREATE TABLE IF NOT EXISTS `capstone-dummy`.`Customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `middle_name` VARCHAR(10) NULL,
  `last_name` VARCHAR(45) NULL,
  `phone` VARCHAR(12) NULL,
  `email` VARCHAR(45) NULL,
  `customer_notes` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `email_UNIQUE` ON `capstone-dummy`.`Customers` (`email` ASC) VISIBLE;

CREATE UNIQUE INDEX `phone_UNIQUE` ON `capstone-dummy`.`Customers` (`phone` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`order_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `capstone-dummy`.`order_status` ;

CREATE TABLE IF NOT EXISTS `capstone-dummy`.`order_status` (
  `order_status_code` INT NOT NULL AUTO_INCREMENT,
  `order_status_description` VARCHAR(45) NULL,
  PRIMARY KEY (`order_status_code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `capstone-dummy`.`Orders` ;

CREATE TABLE IF NOT EXISTS `capstone-dummy`.`Orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `order_status_code` INT NULL,
  `datetime_order_placed` DATETIME(6) NULL,
  `total_order_price` INT NULL,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `customer_id`
    FOREIGN KEY (`customer_id`)
    REFERENCES `capstone-dummy`.`Customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_status_code`
    FOREIGN KEY (`order_status_code`)
    REFERENCES `capstone-dummy`.`order_status` (`order_status_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `customer_id_idx` ON `capstone-dummy`.`Orders` (`customer_id` ASC) VISIBLE;

CREATE INDEX `order_status_code_idx` ON `capstone-dummy`.`Orders` (`order_status_code` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `capstone-dummy`.`Products` ;

CREATE TABLE IF NOT EXISTS `capstone-dummy`.`Products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_SKU` VARCHAR(45) NULL,
  `product_price` INT NULL,
  `product_name` VARCHAR(45) NULL,
  `product_inventory` INT NULL,
  `product_description` VARCHAR(45) NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Order_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `capstone-dummy`.`Order_details` ;

CREATE TABLE IF NOT EXISTS `capstone-dummy`.`Order_details` (
  `order_details_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NULL,
  `product_id` INT NULL,
  `product_quantity` INT NULL,
  PRIMARY KEY (`order_details_id`),
  CONSTRAINT `order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `capstone-dummy`.`Orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `capstone-dummy`.`Products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `order_id_idx` ON `capstone-dummy`.`Order_details` (`order_id` ASC) VISIBLE;

CREATE INDEX `product_id_idx` ON `capstone-dummy`.`Order_details` (`product_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;