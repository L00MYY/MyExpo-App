<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class NivelHandler
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
        $sql = 'SELECT id_nivel_academico, nivel_grado
                FROM nivel_academico
                WHERE nivel_grado LIKE ? 
                ORDER BY nivel_grado';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO nivel_academico(nivel_grado)
                VALUES(?)';
        $params = array($this->nombre);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_nivel_academico, nivel_grado
                FROM nivel_academico
                ORDER BY nivel_grado';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_nivel_academico, nivel_grado
                FROM nivel_academico
                WHERE id_nivel_academico = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE nivel_academico
                SET nivel_grado = ?
                WHERE id_nivel_academico = ?';
        $params = array($this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM nivel_academico
                WHERE id_nivel_academico = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
