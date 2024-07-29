<?php
// Encabezado para permitir solicitudes de cualquier origen.
header('Access-Control-Allow-Origin: *');
// Se establece la zona horaria local para la fecha y hora del servidor.
date_default_timezone_set('America/El_Salvador');
// Constantes para establecer las credenciales de conexión con el servidor de bases de datos.
define('SERVER', 'localhost');
define('DATABASE', 'expo24'); //nombre de la base de datos 
define('USERNAME', 'root'); //usuario 
define('PASSWORD', '');
/*
LINEAS DE COMANDO PARA CREAR UN USUARIO

- mysql -u root
- CREATE USER 'MyExpoRoot'@'localhost' IDENTIFIED BY 'Ricaldone2024';
- GRANT SELECT, INSERT, UPDATE, DELETE, INDEX, CREATE, DROP, ALTER, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EXECUTE, EVENT, TRIGGER ON expo24.* TO 'MyExpoRoot'@'localhost';
- FLUSH PRIVILEGES;

*/


?>