DROP DATABASE IF EXISTS jobby;

CREATE DATABASE jobby;

USE jobby;

CREATE TABLE company
(
  name varchar(30) NOT NULL,
  tags varchar(30) NOT NULL,
  location varchar(20) NOT NULL,
  investors varchar(20) NOT NULL,
  description varchar(200) NOT NULL,
  website varchar(50) NOT NULL,
  founded integer NOT NULL,
  address varchar(100) NOT NULL,
  latitude varchar(10) NOT NULL,
  longitute varchar(20) NOT NULL,
  size varchar(20) NOT NULL,
  id integer NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(ID)
);

LOAD DATA LOCAL INFILE
"/Users/yerincha/Desktop/jobby/db/Bay-Area-Companies-List.csv"
INTO TABLE company
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

create index idx_name on company(name);
