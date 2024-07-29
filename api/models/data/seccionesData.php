<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../helpers/validator.php');
// Se incluye la clase padre.
require_once('../models/handler/seccionesHandler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla SECCIONES.
 */
class SeccionData extends SeccionHandler
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
            $this->data_error = 'El identificador de la sección es incorrecto';
            return false;
        }
    }

    public function setseccion($value)
    {
        if (Validator::validateString($value)) {
            $this->seccion = $value;
            return true;
        } else {
            $this->data_error = 'El nombre de la sección es incorrecto';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}