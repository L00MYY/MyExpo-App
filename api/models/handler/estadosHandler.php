<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
// Se incluye la clase de validación.
require_once('../helpers/validator.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla roles.
 */
class estadosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $estados = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_estado, estado_propuesta
                FROM estado_propuesta
                WHERE estado_propuesta LIKE ?
                ORDER BY estado_propuesta';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO estado_propuesta(estado_propuesta)
                VALUES(?)';
        $params = array($this->estados);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_estado, estado_propuesta
                FROM estado_propuesta
                ORDER BY estado_propuesta';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_estado, estado_propuesta
                FROM estado_propuesta
                WHERE id_estado = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE estado_propuesta
                SET estado_propuesta = ?
                WHERE id_estado = ?';
        $params = array($this->estados, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM estado_propuesta
                WHERE id_estado = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>
