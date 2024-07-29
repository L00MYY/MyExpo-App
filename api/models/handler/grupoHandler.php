<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla grupos_tecnicos.
 */
class GrupoTecnicoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_grupo = null;
    protected $nombre_grupo = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar grupos técnicos por nombre
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_grupo, nombre_grupo
                FROM grupos_tecnicos
                WHERE nombre_grupo LIKE ? 
                ORDER BY nombre_grupo';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    // Método para crear un nuevo grupo técnico
    public function createRow()
    {
        $sql = 'INSERT INTO grupos_tecnicos(nombre_grupo)
                VALUES(?)';
        $params = array($this->nombre_grupo);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener todos los grupos técnicos
    public function readAll()
    {
        $sql = 'SELECT id_grupo, nombre_grupo
                FROM grupos_tecnicos
                ORDER BY nombre_grupo';
        return Database::getRows($sql);
    }

    // Método para obtener un grupo técnico por su ID
    public function readOne()
    {
        $sql = 'SELECT id_grupo, nombre_grupo
                FROM grupos_tecnicos
                WHERE id_grupo = ?';
        $params = array($this->id_grupo);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar un grupo técnico existente
    public function updateRow()
    {
        $sql = 'UPDATE grupos_tecnicos
                SET nombre_grupo = ?
                WHERE id_grupo = ?';
        $params = array($this->nombre_grupo, $this->id_grupo);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un grupo técnico
    public function deleteRow()
    {
        $sql = 'DELETE FROM grupos_tecnicos
                WHERE id_grupo = ?';
        $params = array($this->id_grupo);
        return Database::executeRow($sql, $params);
    }
}
