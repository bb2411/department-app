-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema department-app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema department-app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `department-app` DEFAULT CHARACTER SET utf8 ;
USE `department-app` ;

-- -----------------------------------------------------
-- Table `department-app`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`student` ;

CREATE TABLE IF NOT EXISTS `department-app`.`student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `course` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `contact_student` BIGINT NULL,
  `contact_father` BIGINT NULL,
  `contact_mother` BIGINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `std_email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `std_contact_student_UNIQUE` (`contact_student` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`faculty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`faculty` ;

CREATE TABLE IF NOT EXISTS `department-app`.`faculty` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `post` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `department` VARCHAR(45) NOT NULL,
  `contact_no` BIGINT NOT NULL,
  `education` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `contact_no_UNIQUE` (`contact_no` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`subject` ;

CREATE TABLE IF NOT EXISTS `department-app`.`subject` (
  `subject_code` INT NOT NULL AUTO_INCREMENT,
  `subject_name` VARCHAR(45) NULL,
  PRIMARY KEY (`subject_code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`subject_allocated`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`subject_allocated` ;

CREATE TABLE IF NOT EXISTS `department-app`.`subject_allocated` (
  `faculty_id` INT NULL,
  `subject_code` INT NULL,
  INDEX `suball_faculty_id_idx` (`faculty_id` ASC) VISIBLE,
  INDEX `suball_subject_code_idx` (`subject_code` ASC) VISIBLE,
  CONSTRAINT `suballocated_faculty_id`
    FOREIGN KEY (`faculty_id`)
    REFERENCES `department-app`.`faculty` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `subject_code`
    FOREIGN KEY (`subject_code`)
    REFERENCES `department-app`.`subject` (`subject_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`lab`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`lab` ;

CREATE TABLE IF NOT EXISTS `department-app`.`lab` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `faculty_id` INT NULL,
  `subject_code` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `lab_faculty_id_idx` (`faculty_id` ASC) VISIBLE,
  INDEX `lab_subject_code_idx` (`subject_code` ASC) VISIBLE,
  CONSTRAINT `lab_faculty_id`
    FOREIGN KEY (`faculty_id`)
    REFERENCES `department-app`.`faculty` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lab_subject_code`
    FOREIGN KEY (`subject_code`)
    REFERENCES `department-app`.`subject` (`subject_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`practical_lab`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`practical_lab` ;

CREATE TABLE IF NOT EXISTS `department-app`.`practical_lab` (
  `id` INT NOT NULL,
  `lab_id` INT NULL,
  `description` VARCHAR(100) NULL,
  `practical_date` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `pract_lab_id_idx` (`lab_id` ASC) VISIBLE,
  CONSTRAINT `lab_id`
    FOREIGN KEY (`lab_id`)
    REFERENCES `department-app`.`lab` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`student_lab_data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`student_lab_data` ;

CREATE TABLE IF NOT EXISTS `department-app`.`student_lab_data` (
  `student_id` INT NULL,
  `practical_id` INT NULL,
  `code_file` MEDIUMBLOB NULL,
  `submit_time` DATETIME NULL,
  INDEX `labdata_student_id_idx` (`student_id` ASC) VISIBLE,
  INDEX `labdata_practical_is_idx` (`practical_id` ASC) VISIBLE,
  CONSTRAINT `labdata_student_id`
    FOREIGN KEY (`student_id`)
    REFERENCES `department-app`.`student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `practical_is`
    FOREIGN KEY (`practical_id`)
    REFERENCES `department-app`.`practical_lab` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`semester`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`semester` ;

CREATE TABLE IF NOT EXISTS `department-app`.`semester` (
  `sem_id` INT NOT NULL,
  `faculty_id` INT NULL,
  `sem_no` INT NULL,
  PRIMARY KEY (`sem_id`),
  INDEX `sem_faculty_id_idx` (`faculty_id` ASC) VISIBLE,
  CONSTRAINT `semester_faculty_id`
    FOREIGN KEY (`faculty_id`)
    REFERENCES `department-app`.`faculty` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`lecture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`lecture` ;

CREATE TABLE IF NOT EXISTS `department-app`.`lecture` (
  `id` INT NOT NULL,
  `lecture_date` DATETIME NULL,
  `faculty_id` INT NULL,
  `subject_code` INT NULL,
  `sem_code` INT NULL,
  `Topic` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `lec_sem_code_idx` (`sem_code` ASC) VISIBLE,
  INDEX `lec_faculty_id_idx` (`faculty_id` ASC) VISIBLE,
  INDEX `lec_subject_code_idx` (`subject_code` ASC) VISIBLE,
  CONSTRAINT `sem_code`
    FOREIGN KEY (`sem_code`)
    REFERENCES `department-app`.`semester` (`sem_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lecture_faculty_id`
    FOREIGN KEY (`faculty_id`)
    REFERENCES `department-app`.`faculty` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lecture_subject_code`
    FOREIGN KEY (`subject_code`)
    REFERENCES `department-app`.`subject` (`subject_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`attandance`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`attandance` ;

CREATE TABLE IF NOT EXISTS `department-app`.`attandance` (
  `student_id` INT NOT NULL,
  `status` ENUM("p", "a") NULL,
  `lecture_id` INT NULL,
  PRIMARY KEY (`student_id`),
  INDEX `att_lecture_id_idx` (`lecture_id` ASC) VISIBLE,
  CONSTRAINT `attandance_student_id`
    FOREIGN KEY (`student_id`)
    REFERENCES `department-app`.`student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lecture_id`
    FOREIGN KEY (`lecture_id`)
    REFERENCES `department-app`.`lecture` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`users_table`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`users_table` ;

CREATE TABLE IF NOT EXISTS `department-app`.`users_table` (
  `user_id` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NULL,
  `faculty_id` INT NULL,
  `student_id` INT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `loginuser_email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `loginuser_student_id_idx` (`student_id` ASC) VISIBLE,
  INDEX `loginuser_faculty_id_idx` (`faculty_id` ASC) VISIBLE,
  CONSTRAINT `users_student_id`
    FOREIGN KEY (`student_id`)
    REFERENCES `department-app`.`student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_faculty_id`
    FOREIGN KEY (`faculty_id`)
    REFERENCES `department-app`.`faculty` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`event_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`event_list` ;

CREATE TABLE IF NOT EXISTS `department-app`.`event_list` (
  `id` INT NOT NULL,
  `event_listcol` VARCHAR(45) NULL,
  `description` VARCHAR(200) NULL,
  `date` DATE NULL,
  `document` LONGBLOB NULL,
  `posted_by` INT NULL,
  `status` ENUM("a", "d", "p") NULL,
  PRIMARY KEY (`id`),
  INDEX `posted_by_idx` (`posted_by` ASC) VISIBLE,
  CONSTRAINT `posted_by`
    FOREIGN KEY (`posted_by`)
    REFERENCES `department-app`.`users_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`events_alloted`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`events_alloted` ;

CREATE TABLE IF NOT EXISTS `department-app`.`events_alloted` (
  `event_id` INT NOT NULL,
  `faculty_id` INT NULL,
  PRIMARY KEY (`event_id`),
  INDEX `eventallo_faculty_id_idx` (`faculty_id` ASC) VISIBLE,
  CONSTRAINT `event_id`
    FOREIGN KEY (`event_id`)
    REFERENCES `department-app`.`event_list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `events_faculty_id`
    FOREIGN KEY (`faculty_id`)
    REFERENCES `department-app`.`faculty` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `department-app`.`login_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `department-app`.`login_history` ;

CREATE TABLE IF NOT EXISTS `department-app`.`login_history` (
  `login_time` DATETIME NOT NULL,
  `user_id` INT NULL,
  `token` VARCHAR(200) NULL,
  PRIMARY KEY (`login_time`),
  INDEX `login_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `department-app`.`users_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
