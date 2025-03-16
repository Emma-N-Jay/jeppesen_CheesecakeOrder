-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: pdx0mysql00.campus.up.edu    Database: db_jeppesen27
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.39-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `notes` varchar(3000) DEFAULT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`o_id`),
  KEY `t_id` (`t_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `toppings` (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,2,'extra sprinkles',1,2023),(2,2,1,'no sprinkles',2,2023),(3,3,3,'extra chocolate',3,2023),(4,1,4,'no sprinkles',4,2023),(5,2,5,'extra sprinkles',5,2023),(6,3,6,'no sprinkles',6,2023),(7,4,1,'enter any special instructions here: ',3,2025),(8,4,1,'enter any special instructions here: ',3,2025),(9,4,1,'enter any special instructions here: ',3,2025),(10,4,1,'enter any special instructions here: ',3,2025),(11,4,1,'enter any special instructions here: ',3,2025),(12,4,1,'enter any special instructions here: ',3,2025),(13,4,1,'enter any special instructions here: ',3,2025),(14,4,1,'enter any special instructions here: ',3,2025),(15,4,1,'enter any special instructions here: ',3,2025),(16,4,1,'enter any special instructions here: ',3,2025),(17,4,1,'enter any special instructions here: ',3,2025),(18,4,1,'enter any special instructions here: ',3,2025),(19,4,1,'enter any special instructions here: ',3,2025),(20,4,1,'enter any special instructions here: ',3,2025),(21,4,1,'enter any special instructions here: ',3,2025),(22,4,1,'enter any special instructions here: ',3,2025),(23,1,1,'please work\nplease',3,2025),(24,3,4,'work',3,2025),(25,3,4,'work now',3,2025),(26,1,4,'work now please',3,2025),(27,4,4,'it works! praise the lord!',3,2025),(28,1,1,'god is good. can i have some extra joy please?',3,2025),(29,4,3,'bob',3,2025),(30,3,4,'sally',3,2025),(31,4,1,'sally sells sea shells on the sea shore',3,2025);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `toppings`
--

DROP TABLE IF EXISTS `toppings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `toppings` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toppings`
--

LOCK TABLES `toppings` WRITE;
/*!40000 ALTER TABLE `toppings` DISABLE KEYS */;
INSERT INTO `toppings` VALUES (1,'plain',9.99),(2,'vegan',11.50),(3,'chocolate',12.10),(4,'cherry',14.95);
/*!40000 ALTER TABLE `toppings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 12:25:10
