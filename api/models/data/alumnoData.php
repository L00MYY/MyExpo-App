<?php

//se incluye clase para validar los datos de entrada 
require_once('../helpers/validator.php'); 
//clase padre
require_once('../models/handler/alumnosHandler.php'); 

/*Clase para manejar encapsulamiento de tabla ESTUDIANTE */

class AlumnoData extends AlumnoHandler
{
    //atributo para manejo de errores 
    private $data_error = null; 

    /*Metodos para validar y asignar valores a los atributos */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)){
            $this->id = $value; 
            return true; 
        } else {
            $this->data_error = 'El identificador del alumno es incorrecto'; 
            return false;
        } 
    }

    //metodo Carnet 
    public function setCarnet($value)
    {
        if (Validator::validateNaturalNumber($value)){
            $this->carnet = $value; 
            return true; 
        } else {
            $this->data_error = 'El carnet del estudiante debe ser numerico'; 
            return false;
        }
    }

    //setNombre con los valores minimos y maximo de estudiante 
    public function setNombre($value, $min = 10, $max = 100) {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético'; 
            return false; 
        } elseif (Validator::validateLength($value, $min, $max)){
            $this->nombre = $value; 
            return true; 
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre' .$min . 'y' .$max;
            return false; 
        }
    }


    //setCorreo con longitud minimo y maximo 
    public function setCorreo($value, $min = 8, $max = 100)
    {
        if(!Validator::validateEmail($value)){
            $this->data_error = 'El correo no es válido'; 
            return false; 
        } elseif (Validator::validateLength($value, $min, $max)){
            $this->correo = $value;
            return true;  
        } else {
            $this->data_error = 'El correo debe tener una longitud entre' .$min. ' y ' .$max;
            return false;  
        }
    }

    //setClave
    public function setClave($value)
    {
        if (Validator::validatePassword($value)) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}