<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');

/*
 *  Clase para manejar el comportamiento de los datos de la tabla administradores.
 */
class AdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $carnet = null;
    protected $correo = null;
    protected $clave = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkPassword($password)
    {
        $sql = 'SELECT clave_administrador
                FROM administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_administrador'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE administradores
                SET clave_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->clave, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_administrador, correo_administrador, clave_administrador
            FROM administradores
            WHERE  correo_administrador = ?';
        $params = array($username);
        $data = Database::getRow($sql, $params);
        if ($data && password_verify($password, $data['clave_administrador'])) {
            $_SESSION['idAdministrador'] = $data['id_administrador'];
            $_SESSION['correo'] = $data['correo_administrador'];
            return true;
        } else {
            return false;
        }
    }
    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_administrador, nombre_administrador,correo_administrador
                FROM administradores
                WHERE nombre_administrador LIKE ? 
                ORDER BY nombre_administrador';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_administrador, nombre_administrador,  correo_administrador
                FROM administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE administradores
                SET nombre_administrador = ?,  correo_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre, $this->correo, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO administradores(nombre_administrador, correo_administrador, clave_administrador)
                VALUES(?,?,?)';
        $params = array($this->nombre, $this->correo, $this->clave);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_administrador, nombre_administrador,  correo_administrador
                FROM administradores
                ORDER BY nombre_administrador';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, correo_administrador, clave_administrador
                FROM administradores
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE administradores
                SET nombre_administrador = ?,  correo_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM administradores
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
