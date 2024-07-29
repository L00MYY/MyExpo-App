<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../helpers/validator.php');
// Se incluye la clase padre.
require_once('../models/handler/rolesHandler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla ROLES.
 */
class RolesData extends RolesHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null;

    /*
     *  Métodos para validar y asignar valores de los atributos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del rol es incorrecto';
            return false;
        }
    }

    public function setRoles($value)
    {
        if (Validator::validateString($value)) {
            $this->roles = $value;
            return true;
        } else {
            $this->data_error = 'El nombre del rol es incorrecto';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}
?>
