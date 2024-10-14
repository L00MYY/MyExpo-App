DROP DATABASE IF EXISTS expo24;
CREATE DATABASE expo24;
USE expo24;


-- Table structure for table `administradores`
DROP TABLE IF EXISTS `administradores`;
CREATE TABLE `administradores` (
  `id_administrador` INT NOT NULL AUTO_INCREMENT,
  `nombre_administrador` VARCHAR(50) NOT NULL,
  `correo_administrador` VARCHAR(40) NOT NULL,
  `clave_administrador` VARCHAR(255) NOT NULL,
  `intentos_fallidos` INT UNSIGNED DEFAULT 0 not null,
  `codigo_recuperacion` INT NULL,
  `bloqueo_hasta` DATETIME NULL,
  `fecha_registro` DATE DEFAULT (now()), sexo
  `fecha_ultimo_cambio_clave` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_administrador`),
  UNIQUE KEY `nombre_administrador` (`nombre_administrador`),
  UNIQUE KEY `correo_administrador` (`correo_administrador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;

-- Table structure for table `grupos_tecnicos`
DROP TABLE IF EXISTS `grupos_tecnicos`;
CREATE TABLE `grupos_tecnicos` (
  `id_grupo` INT NOT NULL AUTO_INCREMENT,
  `nombre_grupo` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;


-- Table structure for table `proyectos`
DROP TABLE IF EXISTS `proyectos`;
CREATE TABLE `proyectos` (
  `id_proyecto` INT NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` VARCHAR(50) NOT NULL,
  `objetivo_proyecto` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;


-- Table structure for table `roles`
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table `grados`
DROP TABLE IF EXISTS `grados`;
CREATE TABLE `grados` (
  `id_grado` INT NOT NULL AUTO_INCREMENT,
  `nombre_grado` VARCHAR(40) NOT NULL,
  `nivel_academico`enum('Bachillerato','Tercer ciclo'),
  PRIMARY KEY (`id_grado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;


-- Table structure for table `especialidades`
DROP TABLE IF EXISTS `especialidades`;
CREATE TABLE `especialidades` ( 
  `id_especialidad` INT NOT NULL AUTO_INCREMENT,
  `min_estudiantes` INT(11) DEFAULT NULL CHECK (`min_estudiantes` >= 0),
  `max_estudiantes` INT(11) DEFAULT NULL CHECK (`max_estudiantes` >= 0),
  `nombre_especialidad` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table `profesores`
DROP TABLE IF EXISTS `profesores`;
CREATE TABLE `profesores` (
  `id_profesores` INT NOT NULL AUTO_INCREMENT,
  `nombre_profesor` VARCHAR(50) NOT NULL,
  `carnet_profesor` VARCHAR(11) NOT NULL,
  `correo_profesor` VARCHAR(50) NOT NULL,
  `clave_profesor` VARCHAR(255) NOT NULL,
  `codigo_recuperacion` VARCHAR (6) NULL,
  `nivel_academico_profesor`enum('Bachillerato','Tercer ciclo'),
  `fecha_registro` DATE DEFAULT (now()),
  `fecha_ultimo_cambio_clave` DATETIME NULL DEFAULT NULL,
  `id_especialidad` INT DEFAULT NULL,
  PRIMARY KEY (`id_profesores`),
  UNIQUE KEY `carnet_profesor` (`carnet_profesor`),
  UNIQUE KEY `correo_profesor` (`correo_profesor`),
  KEY `fk_id_especialidad_profesor` (`id_especialidad`),
  CONSTRAINT `fk_id_especialidad_profesor` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id_especialidad`)ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table `secciones`
DROP TABLE IF EXISTS `secciones`;
CREATE TABLE `secciones` (
  `id_seccion` INT NOT NULL AUTO_INCREMENT,
  `nombre_seccion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_seccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;


-- Table structure for table `cursos`
DROP TABLE IF EXISTS `cursos`;
CREATE TABLE `cursos` (
  `id_curso` INT NOT NULL AUTO_INCREMENT,
  `id_grupo` INT DEFAULT NULL,
  `id_profesores` INT DEFAULT NULL,
  `id_grado` INT DEFAULT NULL,
  `id_seccion` INT DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `fk_seccion_cursos` (`id_seccion`), 
  KEY `fk_id_grupo_cursos` (`id_grupo`),
  KEY `fk_id_profesores_cursos` (`id_profesores`),
  KEY `fk_id_grado_cursos` (`id_grado`),
  CONSTRAINT `fk_seccion_cursos` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`) ON DELETE SET NULL, 
  CONSTRAINT `fk_id_grado_cursos` FOREIGN KEY (`id_grado`) REFERENCES `grados` (`id_grado`)ON DELETE SET NULL,
  CONSTRAINT `fk_id_grupo_cursos` FOREIGN KEY (`id_grupo`) REFERENCES `grupos_tecnicos` (`id_grupo`)ON DELETE SET NULL,
  CONSTRAINT `fk_id_profesores_cursos` FOREIGN KEY (`id_profesores`) REFERENCES `profesores` (`id_profesores`)ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table `alumnos`
DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE `alumnos` (
  `id_alumno` INT NOT NULL AUTO_INCREMENT,
  `nombre_alumno` VARCHAR(36) NOT NULL,
  `carnet_alumno` VARCHAR(8) NOT NULL,
  `correo_alumno` VARCHAR(100) NOT NULL,
  `clave_alumno` VARCHAR(255) NOT NULL DEFAULT 'alumn_RicalExpo',
  `id_curso` INT DEFAULT NULL,
  `fecha_inscripcion` DATE DEFAULT NULL,
  PRIMARY KEY (`id_alumno`),
  UNIQUE KEY `carnet_alumno` (`carnet_alumno`),
  UNIQUE KEY `correo_alumno` (`correo_alumno`),
  KEY `fk_id_curso_alumnos` (`id_curso`),
  CONSTRAINT `fk_id_curso_alumnos` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; 


-- Table structure for table `estado_propuesta`
DROP TABLE IF EXISTS `estado_propuesta`;
CREATE TABLE `estado_propuesta` (
  `id_estado` INT NOT NULL AUTO_INCREMENT,
  `estado_propuesta` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;


-- Table structure for table `tipo_propuestas`
DROP TABLE IF EXISTS `tipo_propuestas`;
CREATE TABLE `tipo_propuestas` (
  `id_tipo_propuesta` INT NOT NULL AUTO_INCREMENT,
  `nombre_tipo` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_propuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO tipo_propuestas (nombre_tipo)VALUES('Institucional'); -- Id 1
INSERT INTO tipo_propuestas (nombre_tipo)VALUES('Estudiantil'); -- Id 2
      


DROP TABLE IF EXISTS `equipos_expo`;
CREATE TABLE `equipos_expo` (
    id_equipo INT NOT NULL AUTO_INCREMENT,
    estado_equipo ENUM('Activo', 'Cancelado') NOT NULL,
    PRIMARY KEY (id_equipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;


-- Tabla de relación entre equipos, alumnos y roles
DROP TABLE IF EXISTS `detalles_equipos_expos`;
CREATE TABLE `detalles_equipos_expos` (
  `id_detalle_equipo_expo` INT NOT NULL AUTO_INCREMENT,
  `id_equipo` INT NOT NULL,
  `id_alumno` INT NOT NULL,
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id_detalle_equipo_expo`),
  KEY `fk_id_equipo` (`id_equipo`),
  KEY `fk_id_alumno` (`id_alumno`),
  KEY `fk_id_rol` (`id_rol`),
  CONSTRAINT `fk_id_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipos_expo` (`id_equipo`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;

-- Tabla de Propuestas
DROP TABLE IF EXISTS `propuestas`;
CREATE TABLE `propuestas` (
  `id_propuesta` INT NOT NULL AUTO_INCREMENT,
  `nombre_propuesta` VARCHAR(50) NOT NULL,
  `descripcion_propuesta` VARCHAR(255) NOT NULL,
  `id_equipo` INT DEFAULT NULL,
  `id_estado` INT DEFAULT NULL,
  `id_tipo_propuesta` INT DEFAULT NULL,
  `id_profesor` INT DEFAULT NULL,
  `id_administrador` INT DEFAULT NULL,
  `id_alumno` INT DEFAULT NULL,
  PRIMARY KEY (`id_propuesta`),
  KEY `fk_id_equipo_propuestas` (`id_equipo`),
  KEY `fk_id_estado_propuesta` (`id_estado`),
  KEY `fk_id_tipo_propuesta` (`id_tipo_propuesta`),
  KEY `fk_id_profesor_propuestas` (`id_profesor`),
  KEY `fk_id_administrador_propuestas` (`id_administrador`),
  KEY `fk_id_alumno_propuestas` (`id_alumno`),
  CONSTRAINT `fk_id_profesor_propuestas` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesores`) ON DELETE SET NULL,
  CONSTRAINT `fk_id_administrador_propuestas` FOREIGN KEY (`id_administrador`) REFERENCES `administradores` (`id_administrador`) ON DELETE SET NULL,
  CONSTRAINT `fk_id_alumno_propuestas` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE SET NULL,
  CONSTRAINT `fk_id_equipo_propuestas` FOREIGN KEY (`id_equipo`) REFERENCES `equipos_expo` (`id_equipo`) ON DELETE SET NULL,  -- Aquí está la corrección
  CONSTRAINT `fk_id_estado_propuesta` FOREIGN KEY (`id_estado`) REFERENCES `estado_propuesta` (`id_estado`) ON DELETE SET NULL,
  CONSTRAINT `fk_id_tipo_propuesta` FOREIGN KEY (`id_tipo_propuesta`) REFERENCES `tipo_propuestas` (`id_tipo_propuesta`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;



-- Tabla de Archivos Adjuntos
DROP TABLE IF EXISTS `archivos_propuesta`;
CREATE TABLE `archivos_propuesta` (
  `id_archivo_propuesta` INT NOT NULL AUTO_INCREMENT,
  `id_propuesta` INT NOT NULL,
  `nombre_archivo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_archivo_propuesta`),
  KEY `fk_id_propuesta` (`id_propuesta`),
  CONSTRAINT `fk_id_propuesta` FOREIGN KEY (`id_propuesta`) REFERENCES `propuestas` (`id_propuesta`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;

-- Insertar datos en la tabla `grupos_tecnicos`
INSERT INTO grupos_tecnicos (nombre_grupo) 
VALUES ('Grupo 1'),
       ('Grupo 2'),
       ('Grupo 3'),
       ('Grupo 4');

-- Insertar datos en la tabla `proyectos`
INSERT INTO proyectos (nombre_proyecto, objetivo_proyecto) 
VALUES ('Sistema de Gestión Escolar', 'Automatizar la gestión académica'),
       ('Red Inalámbrica Segura', 'Implementar una red segura en la institución'),
       ('Control de Inventarios', 'Optimizar el control de inventarios en la escuela'),
       ('Asistente Virtual', 'Desarrollar un asistente virtual para los estudiantes');

-- Insertar datos en la tabla `roles`
INSERT INTO roles (nombre_rol) 
VALUES ('Coordinador'),
       ('Sub-coordinador'),
       ('Tesorero'),
       ('Secretario'),
       ('Vocal-1');

-- Insertar datos en la tabla `grados`
INSERT INTO grados (nombre_grado, nivel_academico) 
VALUES ('Sexto Grado', 'Tercer ciclo'),
       ('Séptimo Grado', 'Tercer ciclo'),
       ('Octavo Grado', 'Tercer ciclo'),
       ('Noveno Grado', 'Tercer ciclo'),
       ('Primer año', 'Bachillerato'),
       ('Segundo año', 'Bachillerato'),
       ('Tercer año', 'Bachillerato');

-- Insertar datos en la tabla `especialidades`
INSERT INTO especialidades (nombre_especialidad) 
VALUES ('Desarrollo de software'),
       ('Arquitectura'),
       ('Administrativo contable'),
       ('Automotriz'),
       ('Diseño gráfico');

-- Insertar datos en la tabla `profesores`
-- Los profesores de Tercer ciclo no tienen especialidad
INSERT INTO profesores (nombre_profesor, carnet_profesor, correo_profesor, clave_profesor, nivel_academico_profesor, id_especialidad) 
VALUES ('Carlos Perez', 'CP001', 'cperez@example.com', 'claveCP1', 'Tercer ciclo', NULL),
		 ('Ana Gomez', 'AG002', 'agomez@example.com', 'claveAG2', 'Tercer ciclo', NULL),
		 ('Luis Martinez', 'LM003', 'lmartinez@example.com', 'claveLM3', 'Bachillerato', 3),
		 ('María Rodríguez', 'MR004', 'mrodriguez@example.com', 'claveMR4', 'Bachillerato', 4);



-- Insertar datos en la tabla `secciones`
INSERT INTO secciones (nombre_seccion) 
VALUES ('A'), ('B'), ('C'), ('D');

-- Insertar datos en la tabla cursos
-- Cursos de Tercer ciclo no deben tener id_grupo ni id_especialidad
INSERT INTO cursos (id_grado, id_profesores, id_grupo, id_seccion) 
VALUES (1, 1, NULL, 1), -- Sexto Grado, Tercer ciclo, sin grupo técnico
		 (2, 2, NULL, 2), -- Séptimo Grado, Tercer ciclo, sin grupo técnico
		 (3, 1, NULL, 1), -- Octavo Grado, Tercer ciclo, sin grupo técnico
		 (4, 2, NULL, 2), -- Noveno Grado, Tercer ciclo, sin grupo técnico
		 (5, 3, 1, NULL),    -- Primer año, Bachillerato, con grupo técnico
		 (6, 4, 2, NULL);    -- Segundo año, Bachillerato, con grupo técnico
-- Insertar más datos en la tabla equipos_expo



-- Año 2023
INSERT INTO alumnos (nombre_alumno, carnet_alumno, correo_alumno, id_curso, fecha_inscripcion)
VALUES ('José Herrera', 'JH9900', 'jose.herrera@example.com', 1, '2023-05-19'),
       ('Elena Martínez', 'EM1123', 'elena.martinez@example.com', 1, '2023-08-02'),
       ('Miguel Rivas', 'MR4455', 'miguel.rivas@example.com', 1, '2023-10-15'),
       ('Laura Gómez', 'LG6677', 'laura.gomez@example.com', 1, '2023-11-01'),
       ('Andrés Soto', 'AS8899', 'andres.soto@example.com', 1, '2023-12-15'),
       ('Carla Fernández', 'CF1122', 'carla.fernandez@example.com', 2, '2023-06-12'),
       ('Javier Morales', 'JM3344', 'javier.morales@example.com', 2, '2023-09-07'),
       ('Samantha López', 'SL5566', 'samantha.lopez@example.com', 2, '2023-10-20'),
       ('Ricardo Vargas', 'RV7788', 'ricardo.vargas@example.com', 2, '2023-11-28'),
       ('Paola Castillo', 'PC9900', 'paola.castillo@example.com', 2, '2023-12-01'),
       ('Marta Reyes', 'MR5566', 'marta.reyes@example.com', 3, '2023-02-20'),
       ('Tomás López', 'TL7788', 'tomas.lopez@example.com', 3, '2023-04-05'),
       ('Isabel Núñez', 'IN9900', 'isabel.nunez@example.com', 3, '2023-07-25'),
       ('Jorge Fernández', 'JF2233', 'jorge.fernandez@example.com', 3, '2023-09-15'),
       ('Beatriz López', 'BL4455', 'beatriz.lopez@example.com', 3, '2023-12-05');

-- Año 2024
INSERT INTO alumnos (nombre_alumno, carnet_alumno, correo_alumno, id_curso, fecha_inscripcion)
VALUES ('Sofía Díaz', 'SD6677', 'sofia.diaz@example.com', 1, '2024-01-12'),
       ('Daniel Castro', 'DC8899', 'daniel.castro@example.com', 1, '2024-03-28'),
       ('Valeria Morales', 'VM2233', 'valeria.morales@example.com', 1, '2024-06-10'),
       ('Fernando Ortiz', 'FO4456', 'fernando.ortiz@example.com', 1, '2024-09-14'),
       ('Gabriela Núñez', 'GN6678', 'gabriela.nunez@example.com', 2, '2024-11-20'),
       ('Martín Jiménez', 'MJ3344', 'martin.jimenez@example.com', 1, '2024-01-25'),
       ('Verónica Silva', 'VS5566', 'veronica.silva@example.com', 2, '2024-03-15'),
       ('Luis Mendoza', 'LM7788', 'luis.mendoza@example.com', 3, '2024-05-20'),
       ('Nerea Ramírez', 'NR9900', 'nerea.ramirez@example.com', 2, '2024-08-05'),
       ('Rafael Pérez', 'RP1122', 'rafael.perez@example.com', 1, '2024-10-30'),
       ('Natalia Paredes', 'NP1122', 'natalia.paredes@example.com', 2, '2024-02-20'),
       ('Carlos Gómez', 'CG2233', 'carlos.gomez@example.com', 2, '2024-04-10'),
       ('Juliana Ruiz', 'JR3344', 'juliana.ruiz@example.com', 2, '2024-07-30'),
       ('Ricardo Morales', 'RM4455', 'ricardo.morales@example.com', 1, '2024-09-05'),
       ('Ana Martínez', 'AM5566', 'ana.martinez@example.com', 3, '2024-12-10');
       
INSERT INTO equipos_expo (estado_equipo) 
VALUES ('Activo'), ('Activo'), ('Activo'), ('Cancelado');

-- Insertar más detalles de equipos expo
INSERT INTO detalles_equipos_expos (id_rol, id_alumno, id_equipo) 
VALUES 
(1, 1, 1), (2, 2, 1), (3, 3, 2), (4, 4, 2), 
(1, 5, 3), (2, 6, 3), (3, 7, 4), (4, 8, 4);

-- Insertar datos en la tabla `estado_propuesta`
INSERT INTO estado_propuesta (estado_propuesta) 
VALUES ('En Revisión'), ('Aprobado'), ('Rechazado');

-- Insertar datos en la tabla `propuestas`
INSERT INTO propuestas (nombre_propuesta, descripcion_propuesta, id_equipo, id_estado, id_tipo_propuesta) 
VALUES ('Sistema de Gestión Escolar', 'Automatización de la gestión académica', 1, 1, 1),
       ('Red Inalámbrica Segura', 'Implementación de una red segura en la institución', 2, 2, 2),
       ('Control de Inventarios', 'Optimización del control de inventarios en la escuela', 3, 3, 1),
       ('Asistente Virtual', 'Desarrollo de un asistente virtual para los estudiantes', 4, 1, 2);

-- Insertar datos en la tabla `archivos_propuesta`
INSERT INTO archivos_propuesta (id_propuesta, nombre_archivo) 
VALUES (1, '66c4ca24025fe.pdf'),
       (2, '66c4ca4791982.pdf'),
       (3, '66c4cbb258b62.pdf'),
       (4, '66c4cbb258b62.pdf');



-- Consultas para seleccionar todas las tablas

-- Seleccionar todos los registros de la tabla `administradores`
SELECT * FROM administradores;

-- Seleccionar todos los registros de la tabla `grupos_tecnicos`
SELECT * FROM grupos_tecnicos;

-- Seleccionar todos los registros de la tabla `proyectos`
SELECT * FROM proyectos;

-- Seleccionar todos los registros de la tabla `roles`
SELECT * FROM roles;

-- Seleccionar todos los registros de la tabla `grados`
SELECT * FROM grados;

-- Seleccionar todos los registros de la tabla `especialidades`
SELECT * FROM especialidades;

-- Seleccionar todos los registros de la tabla `profesores`
SELECT * FROM profesores;

-- Seleccionar todos los registros de la tabla `cursos`
SELECT * FROM cursos;

-- Seleccionar todos los registros de la tabla `alumnos`
SELECT * FROM alumnos;

-- Seleccionar todos los registros de la tabla `archivos_propuesta`
SELECT * FROM archivos_propuesta;

-- Seleccionar todos los registros de la tabla `secciones`
SELECT * FROM secciones;

-- Seleccionar todos los registros de la tabla `estado_propuesta`
SELECT * FROM estado_propuesta;

-- Seleccionar todos los registros de la tabla `tipo_propuestas`
SELECT * FROM tipo_propuestas;

-- Seleccionar todos los registros de la tabla `propuestas`
SELECT * FROM propuestas;


-- Seleccionar todos los registros de la tabla `equipo_expo`
SELECT * FROM equipos_expo;




-- FUNCION PARA GENERAR CARNET DE PROFESOR DE FORMA AUTOMATICA (FALTAN DETALLES) 
DELIMITER //

CREATE FUNCTION generar_carnet(nombre_profesor VARCHAR(50), id_especialidad INT) RETURNS VARCHAR(11)
BEGIN
    DECLARE iniciales VARCHAR(2);
    DECLARE contador INT;
    DECLARE carnet VARCHAR(11);
    
    -- Obtener las iniciales en mayúsculas
    SET iniciales = CONCAT(
        UPPER(SUBSTRING(SUBSTRING_INDEX(nombre_profesor, ' ', 1), 1, 1)),
        UPPER(SUBSTRING(SUBSTRING_INDEX(nombre_profesor, ' ', -1), 1, 1))
    );
    
    -- Limitar las iniciales a un máximo de 2 caracteres
    SET iniciales = LEFT(iniciales, 2);
    
    -- Contar el número de registros en la especialidad para determinar el número correlativo
    SELECT COUNT(*) INTO contador
    FROM profesores
    WHERE id_especialidad = id_especialidad;
    
    -- Crear el carnet
    SET carnet = CONCAT(iniciales, LPAD(contador + 1, 2, '0'));
    
    RETURN carnet;
END //

DELIMITER ;




-- TRIGGER PARA CREAR OTRO CARNET AUTOMATICAMENTE MANDANDO A LLAMAR A LA FUNCION 
DELIMITER //

CREATE TRIGGER antes_insertar_profesor
BEFORE INSERT ON profesores
FOR EACH ROW
BEGIN
    DECLARE carnet_generado VARCHAR(11);
    
    -- Llamar a la función para generar el carnet
    SET carnet_generado = generar_carnet(NEW.nombre_profesor, NEW.id_especialidad);
    
    -- Asignar el carnet generado al nuevo registro
    SET NEW.carnet_profesor = carnet_generado;
END //

DELIMITER ;







