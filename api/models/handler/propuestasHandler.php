<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla propuestas.
 */
class PropuestaHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_propuesta = null;
    protected $nombre_propuesta = null;
    protected $descripcion_propuesta = null;
    protected $archivo_adjunto = null;
    protected $id_curso = null;
    protected $id_estado = null;
    protected $id_tipo_propuesta = null;

    // Constante para establecer la ruta de las imágenes.
const RUTA_DOCUMENTO = '../files/propuestas';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    // Método para buscar propuestas por nombre
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_propuesta, nombre_propuesta, descripcion_propuesta, archivo_adjunto, id_curso, id_estado, id_tipo_propuesta
                FROM propuestas
                WHERE nombre_propuesta LIKE ? 
                ORDER BY nombre_propuesta';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    // Método para crear una nueva propuesta instuticional
    public function createRow()
    {
        $sql = 'INSERT INTO propuestas(nombre_propuesta, descripcion_propuesta, archivo_adjunto, id_estado, id_tipo_propuesta)
                VALUES(?, ?, ?, ?, 1)';
        $params = array($this->nombre_propuesta, $this->descripcion_propuesta, $this->archivo_adjunto, $this->id_estado);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener todas las propuestas
    public function readAll()
    {
        $sql = 'SELECT p.id_propuesta, p.nombre_propuesta, e.estado_propuesta
        FROM propuestas p
        JOIN estado_propuesta e ON p.id_estado = e.id_estado
        ORDER BY p.nombre_propuesta';
        return Database::getRows($sql);
    }

    // Método para obtener una propuesta por su ID
    public function readOne()
    {
        $sql = 'SELECT id_propuesta, nombre_propuesta, descripcion_propuesta, archivo_adjunto, id_curso, id_estado, id_tipo_propuesta
                FROM propuestas
                WHERE id_propuesta = ?';
        $params = array($this->id_propuesta);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar una propuesta existente
    public function updateRow()
    {
        $sql = 'UPDATE propuestas
                SET nombre_propuesta = ?, descripcion_propuesta = ?, id_curso = ?, id_estado = ?, id_tipo_propuesta = ?
                WHERE id_propuesta = ?';
        $params = array($this->nombre_propuesta, $this->descripcion_propuesta, $this->id_curso, $this->id_estado, $this->id_tipo_propuesta, $this->id_propuesta);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar una propuesta
    public function deleteRow()
    {
        $sql = 'DELETE FROM propuestas
                WHERE id_propuesta = ?';
        $params = array($this->id_propuesta);
        return Database::executeRow($sql, $params);
    }

    
    public function readFilename()
    {
        $sql = 'SELECT archivo_adjunto
                FROM propuestas
                WHERE id_propuesta = ?';
        $params = array($this->id_propuesta);
        return Database::getRow($sql, $params);
    }
}
?>