-- CRPMS (Car Repair Payment Management System) SQL Schema
-- Database: crpms

CREATE DATABASE IF NOT EXISTS crpms;
USE crpms;

-- Table: Services
CREATE TABLE Services (
    ServiceCode INT PRIMARY KEY AUTO_INCREMENT,
    ServiceName VARCHAR(100) NOT NULL,
    ServicePrice DECIMAL(10,2) NOT NULL
);

-- Table: Car
CREATE TABLE Car (
    PlateNumber VARCHAR(20) PRIMARY KEY,
    Type VARCHAR(50) NOT NULL,
    Model VARCHAR(50) NOT NULL,
    ManufacturingYear INT NOT NULL,
    DriverPhone VARCHAR(20) NOT NULL,
    MechanicName VARCHAR(100) NOT NULL
);

-- Table: ServiceRecord
CREATE TABLE ServiceRecord (
    RecordNumber INT PRIMARY KEY AUTO_INCREMENT,
    PlateNumber VARCHAR(20) NOT NULL,
    ServiceCode INT NOT NULL,
    ServiceDate DATE NOT NULL,
    FOREIGN KEY (PlateNumber) REFERENCES Car(PlateNumber) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ServiceCode) REFERENCES Services(ServiceCode) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: Payment
CREATE TABLE Payment (
    PaymentNumber INT PRIMARY KEY AUTO_INCREMENT,
    RecordNumber INT NOT NULL,
    AmountPaid DECIMAL(10,2) NOT NULL,
    PaymentDate DATE NOT NULL,
    FOREIGN KEY (RecordNumber) REFERENCES ServiceRecord(RecordNumber) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: Users (for login)
CREATE TABLE Users (
    UserId INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);
