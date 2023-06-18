-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2023 at 04:36 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- START TRANSACTION;
-- SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: journalDB`
--

-- --------------------------------------------------------
-- Table structure for table `users`
-- user-role : 1. student, 2. teacher

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_role int(11) NOT NULL,
  username varchar(250) NOT NULL,
  password varchar(250) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- --------------------------------------------------------
-- Table structure for table `journals`

CREATE TABLE journals (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  description TEXT NOT NULL,
  url varchar(250),
  published_date datetime NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- --------------------------------------------------------
-- Table structure for table `journal_tagged_users`

CREATE TABLE journal_tagged_students (
  journal_id INT,
  user_id INT,
  PRIMARY KEY (journal_id, user_id),
  FOREIGN KEY (journal_id) REFERENCES journals(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- --------------------------------------------------------

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
