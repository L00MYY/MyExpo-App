<?php
// Se incluye la clase para validar los datos de entrada
require_once('../helpers/validator.php');
// Se incluye la clase padre
require_once('../models/handler/grupoHandler.php');

/* Clase para manejar el encapsulamiento de datos de la tabla grupos_tecnicos */

class GrupoTecnicoData extends GrupoTecnicoHandler
{
    // Atributo para manejar errores de datos
    private $data_error = null;

    /* Métodos para validar y asignar valores a los atributos */

    // Método para establecer el ID del grupo técnico
    public function setIdGrupo($value)
    {
        // Validación básica de número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->id_grupo = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del grupo técnico es incorrecto';
            return false;
        }
    }

    // Método para establecer el nombre del grupo técnico
    public function setNombreGrupo($value, $min = 1, $max = 50)
    {
        // Validación de valor alfabético y longitud
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre del grupo técnico debe ser alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre_grupo = $value;
            return true;
        } else {
            $this->data_error = 'El nombre del grupo técnico debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Método para obtener el error de los datos
    public function getDataError()
    {
        return $this->data_error;
    }
}
