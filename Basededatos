DROP DATABASE IF EXISTS expo24;
CREATE DATABASE expo24;
USE expo24;

-- Table structure for table `administradores`
DROP TABLE IF EXISTS `administradores`;
CREATE TABLE `administradores` (
  `id_administrador` INT NOT NULL AUTO_INCREMENT,
  `nombre_administrador` VARCHAR(50) NOT NULL,
  `correo_administrador` VARCHAR(40) NOT NULL,
  `clave_administrador` VARCHAR(100) NOT NULL,
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

-- Table structure for table `nivel_academico`
DROP TABLE IF EXISTS `nivel_academico`;
CREATE TABLE `nivel_academico` (
  `id_nivel_academico` INT NOT NULL AUTO_INCREMENT,
  `nivel_grado` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_nivel_academico`)
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
  `id_nivel_academico` INT DEFAULT NULL,
  PRIMARY KEY (`id_grado`),
  KEY `fk_id_nivel_academico_grado` (`id_nivel_academico`),
  CONSTRAINT `fk_id_nivel_academico_grado` FOREIGN KEY (`id_nivel_academico`) REFERENCES `nivel_academico` (`id_nivel_academico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;


-- Table structure for table `especialidades`
DROP TABLE IF EXISTS `especialidades`;
CREATE TABLE `especialidades` (
  `id_especialidad` INT NOT NULL AUTO_INCREMENT,
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
  `clave_profesor` VARCHAR(4r0) NOT NULL,
  `id_especialidad` INT DEFAULT NULL,
  PRIMARY KEY (`id_profesores`),
  UNIQUE KEY `carnet_profesor` (`carnet_profesor`),
  UNIQUE KEY `correo_profesor` (`correo_profesor`),
  KEY `fk_id_especialidad_profesor` (`id_especialidad`),
  CONSTRAINT `fk_id_especialidad_profesor` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id_especialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table `cursos`
DROP TABLE IF EXISTS `cursos`;
CREATE TABLE `cursos` (
  `id_curso` INT NOT NULL AUTO_INCREMENT,
  `minestudiantes` INT(11) DEFAULT NULL CHECK (`minestudiantes` >= 0),
  `maxestuidantes` INT(11) DEFAULT NULL CHECK (`maxestuidantes` >= 0),
  `id_grupo` INT DEFAULT NULL,
  `id_profesores` INT DEFAULT NULL,
  `id_grado` INT DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `fk_id_grupo_cursos` (`id_grupo`),
  KEY `fk_id_profesores_cursos` (`id_profesores`),
  KEY `fk_id_grado_cursos` (`id_grado`),
  CONSTRAINT `fk_id_grado_cursos` FOREIGN KEY (`id_grado`) REFERENCES `grados` (`id_grado`),
  CONSTRAINT `fk_id_grupo_cursos` FOREIGN KEY (`id_grupo`) REFERENCES `grupos_tecnicos` (`id_grupo`),
  CONSTRAINT `fk_id_profesores_cursos` FOREIGN KEY (`id_profesores`) REFERENCES `profesores` (`id_profesores`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `alumnos`
DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE `alumnos` (
  `id_alumno` INT NOT NULL AUTO_INCREMENT,
  `nombre_alumno` VARCHAR(36) NOT NULL,
  `carnet_alumno` INT(11) NOT NULL,
  `correo_alumno` VARCHAR(100) NOT NULL,
  `clave_alumno` VARCHAR(50) NOT NULL,
  `id_curso` INT DEFAULT NULL,
  PRIMARY KEY (`id_alumno`),
  UNIQUE KEY `carnet_alumno` (`carnet_alumno`),
  UNIQUE KEY `correo_alumno` (`correo_alumno`),
  KEY `fk_id_curso_alumnos` (`id_curso`),
  CONSTRAINT `fk_id_curso_alumnos` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `archivo_adjunto`
DROP TABLE IF EXISTS `archivo_adjunto`;
CREATE TABLE `archivo_adjunto` (
  `id_archivo_adjunto` INT NOT NULL AUTO_INCREMENT,
  `archivo_ajunto` LONGBLOB DEFAULT NULL,
  PRIMARY KEY (`id_archivo_adjunto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;  


-- Table structure for table `secciones`
DROP TABLE IF EXISTS `secciones`;
CREATE TABLE `secciones` (
  `id_seccion` INT NOT NULL AUTO_INCREMENT,
  `nombre_seccion` VARCHAR(50) NOT NULL,
  `horario_seccion` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id_seccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;

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
INSERT INTO tipo_propuestas (nombre_tipo)VALUES('No Institucional'); -- Id 2
      
-- Table structure for table `propuestas`
DROP TABLE IF EXISTS `propuestas`;
CREATE TABLE `propuestas` (
  `id_propuesta` INT NOT NULL AUTO_INCREMENT,
  `nombre_propuesta` VARCHAR(50) NOT NULL,
  `descripcion_propuesta` VARCHAR(255) NOT NULL,
  `archivo_adjunto` VARCHAR(255) DEFAULT NULL,
  `id_curso` INT DEFAULT NULL,
  `id_estado` INT DEFAULT NULL,
  `id_tipo_propuesta` INT DEFAULT NULL,
  PRIMARY KEY (`id_propuesta`),
  KEY `fk_id_curso_propuestas` (`id_curso`),
  KEY `fk_id_estado_propuesta` (`id_estado`),
  KEY `fk_id_tipo_propuesta` (`id_tipo_propuesta`),
  CONSTRAINT `fk_id_curso_propuestas` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`),
  CONSTRAINT `fk_id_estado_propuesta` FOREIGN KEY (`id_estado`) REFERENCES `estado_propuesta` (`id_estado`),
  CONSTRAINT `fk_id_tipo_propuesta` FOREIGN KEY (`id_tipo_propuesta`) REFERENCES `tipo_propuestas` (`id_tipo_propuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;
                       
-- Table structure for table `dt_curso`
DROP TABLE IF EXISTS `dt_curso`;
CREATE TABLE `dt_curso` (
  `id_detalle` INT NOT NULL AUTO_INCREMENT,
  `id_curso` INT DEFAULT NULL,
  `id_seccion` INT DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_curso_detalles` (`id_curso`),
  KEY `id_seccion_detalle` (`id_seccion`),
  CONSTRAINT `id_curso_detalles` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`),
  CONSTRAINT `id_seccion_detalle` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;



-- Table structure for table `equipo_expo`
DROP TABLE IF EXISTS `equipo_expo`;
CREATE TABLE `equipo_expo` (
  `id_equipo_expo` INT NOT NULL AUTO_INCREMENT,
  `id_rol` INT DEFAULT NULL,
  `id_alumno` INT DEFAULT NULL,
  `id_proyecto` INT DEFAULT NULL,
  PRIMARY KEY (`id_equipo_expo`),
  KEY `fk_id_rol_equipo_expo` (`id_rol`),
  KEY `fk_id_proyecto_equipo_expo` (`id_proyecto`),
  KEY `fk_id_alumno_equipo_expo` (`id_alumno`),
  CONSTRAINT `fk_id_alumno_equipo_expo` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`),
  CONSTRAINT `fk_id_proyecto_equipo_expo` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`),
  CONSTRAINT `fk_id_rol_equipo_expo` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
