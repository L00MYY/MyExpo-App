<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

class profesorHandler{

    protected $id = null; 
    protected $nombre = null; 
    protected $carnet = null; 
    protected $correo= null; 
    protected $clave = null; 
    protected $curso = null; 
    protected $especialidad = null; 


    /*METODOS DE OPERACINES SCRUD PROFESORES */

    //Busqueda de registros 
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_profesores, nombre_profesor, carnet_profesor, correo_profesor
                FROM profesores
                WHERE nombre_profesor LIKE ? OR carnet_profesor LIKE ? 
                ORDER BY carnet_profesor';
        $params = array($value, $value); 
        return Database::getRows($sql, $params); 
    }

    
    //METODO ACTUALIZAR REGISTROS 
    public function editProfesor(){
        $sql = 'UPDATE profesores
                SET nombre_profesor = ?, carnet_profesor = ?, correo_profesor = ?
                WHERE id_profesores = ?'; 
        $params = array($this->nombre, $this->carnet, $this->correo); 
        return Database::executeRow($sql, $params); 
    }
    
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_profesores, correo_profesor, correo_profesor
            FROM administradores
            WHERE  correo_profesor = ?';
        $params = array($username);
        $data = Database::getRow($sql, $params);
        if ($data && password_verify($password, $data['clave_profesor'])) {
            $_SESSION['idProfesor'] = $data['id_profesores'];
            $_SESSION['correo'] = $data['correo_profesor'];
            return true;
        } else {
            return false;
        }
    }


    // METODO CREATE REGISTRO 
    public function createRow() {
    $sql = 'INSERT INTO profesores(nombre_profesor, carnet_profesor, correo_profesor, clave_profesor, id_especialidad) 
    VALUES (?, ?, ?, ?, ?)'; 
    // Proporcionar los valores para las columnas
    $params = array($this->nombre, $this->carnet, $this->correo, $this->clave, $this->especialidad); 
    return Database::executeRow($sql, $params); 
}




    //Metodo para leer todos los registros en tabla 
    public function readAll()
    {
        $sql = 'SELECT id_profesores, nombre_profesor, carnet_profesor, correo_profesor
                FROM profesores
                ORDER BY carnet_profesor';
        return Database::getRows($sql);
    }

    
    //Metodo para leer un solo registro 
    public function readOne()
    {
        $sql = 'SELECT id_profesores, nombre_profesor, carnet_profesor, correo_profesor FROM profesores
                WHERE id_profesores = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE profesores
                SET nombre_profesor = ?, carnet_profesor = ?, correo_profesor = ?
                WHERE id_profesores = ?';
        $params = array($this->nombre, $this->carnet, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    //Metodo para eliminar un registro de la tabla alumnos 
    public function deleteRow()
    {
        $sql = 'DELETE FROM profesores
                WHERE id_profesores = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}