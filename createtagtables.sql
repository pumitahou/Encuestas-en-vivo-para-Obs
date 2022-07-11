CREATE TABLE `tags` (
 `uuid` varchar(36) NOT NULL,
 `email` varchar(320) NOT NULL COMMENT 'este correo es el que le da\r\nla propiedad de manipular la tag\r\nal usuario que la crea con los \r\ndatos de la tabla cllient',
 `value` int(11) NOT NULL,
 `tagname` varchar(30) NOT NULL,
 `isDeleted` tinyint(4) NOT NULL,
 UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4