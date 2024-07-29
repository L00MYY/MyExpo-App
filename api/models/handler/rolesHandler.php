<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
// Se incluye la clase de validación.
require_once('../helpers/validator.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla roles.
 */
class RolesHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $roles = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_rol, rol_estudiante
                FROM roles
                WHERE rol_estudiante LIKE ?
                ORDER BY rol_estudiante';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO roles(rol_estudiante)
                VALUES(?)';
        $params = array($this->roles);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_rol, rol_estudiante
                FROM roles
                ORDER BY rol_estudiante';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_rol, rol_estudiante
                FROM roles
                WHERE id_rol = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE roles
                SET rol_estudiante = ?
                WHERE id_rol = ?';
        $params = array($this->roles, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM roles
                WHERE id_rol = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>
