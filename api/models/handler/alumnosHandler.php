<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

class AlumnoHandler
{

    protected $id = null;
    protected $carnet = null;
    protected $nombre = null;
    protected $correo = null;
    protected $clave = null;
    protected $curso = null; 



    /*METODOS DE OPERACIONES SCRUD alumnos */
    
    //METODO DE BUSQUEDA DE REGISTROS 
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_alumno, nombre_alumno, carnet_alumno, correo_alumno
                FROM alumnos
                WHERE nombre_alumno LIKE ? OR carnet_alumno LIKE ? 
                ORDER BY carnet_alumno';
        $params = array($value, $value); 
        return Database::getRows($sql, $params); 
    }


    //METODO CREATE REGISTRO 
    public function createRow (){
        $sql = 'INSERT INTO alumnos(nombre_alumno, carnet_alumno, correo_alumno, clave_alumno)
                VALUES (?, ?, ?, ?)'; 
        $params = array( $this->nombre, $this->carnet, $this->correo, $this->clave); 
        return Database::executeRow($sql, $params); 
    }

    //Metodo para leer todos los registros en tabla 
    public function readAll()
    {
        $sql = 'SELECT id_alumno, nombre_alumno, carnet_alumno, correo_alumno
                FROM alumnos
                ORDER BY carnet_alumno';
        return Database::getRows($sql);
    }

    //Metodo para leer un solo registro 
    public function readOne()
    {
        $sql = 'SELECT id_alumno, nombre_alumno, carnet_alumno, correo_alumno FROM alumnos
                WHERE id_alumno = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Metodo para actualizar un registro de alumno 
    public function updateRow()
    {
        $sql = 'UPDATE alumnos
                SET nombre_alumno = ?, carnet_alumno = ?, correo_alumno = ?
                WHERE id_alumno = ?';
        $params = array($this->nombre, $this->carnet, $this->correo);
        return Database::executeRow($sql, $params);
    }

    //Metodo para eliminar un registro de la tabla alumnos 
    public function deleteRow()
    {
        $sql = 'DELETE FROM alumnos
                WHERE id_alumno = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

}
