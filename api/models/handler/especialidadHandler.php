<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class EspecialidadHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;

    
    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_especialidad, nombre_especialidad
                FROM especialidades
                WHERE nombre_especialidad LIKE ? 
                ORDER BY nombre_especialidad';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO especialidades(nombre_especialidad)
                VALUES(?)';
        $params = array($this->nombre);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_especialidad, nombre_especialidad
                FROM especialidades
                ORDER BY nombre_especialidad';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_especialidad, nombre_especialidad
                FROM especialidades
                WHERE id_especialidad = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE especialidades
                SET nombre_especialidad = ?
                WHERE id_especialidad = ?';
        $params = array($this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM especialidades
                WHERE id_especialidad = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
