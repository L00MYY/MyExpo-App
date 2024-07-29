<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../helpers/validator.php');
// Se incluye la clase padre.
require_once('../models/handler/estadosHandler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla ROLES.
 */
class estadosData extends estadosHandler
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
            $this->data_error = 'El identificador del estado es incorrecto';
            return false;
        }
    }

    public function setEstados($value)
    {
        if (Validator::validateString($value)) {
            $this->estados= $value;
            return true;
        } else {
            $this->data_error = 'El nombre del estado es incorrecto';
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
