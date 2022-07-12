CREATE TABLE `clients` (
 `name` varchar(40) NOT NULL,
 `password` varchar(64) NOT NULL,
 `is_premium` tinyint(1) NOT NULL,
 `email` varchar(320) NOT NULL,
 UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;