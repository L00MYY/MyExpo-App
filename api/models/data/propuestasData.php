<?php
// Se incluye la clase para validar los datos de entrada
require_once('../helpers/validator.php');
// Se incluye la clase padre
require_once('../models/handler/propuestasHandler.php');

/* Clase para manejar el encapsulamiento de datos de la tabla propuestas */

class PropuestaData extends PropuestaHandler
{
    // Atributo para manejar errores de datos
    private $data_error = null;
    private $filename = null;

    /* Métodos para validar y asignar valores a los atributos */

    // Método para establecer el ID de la propuesta
    public function setIdPropuesta($value)
    {
        // Validación básica de número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->id_propuesta = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la propuesta es incorrecto';
            return false;
        }
    }

    // Método para establecer el nombre de la propuesta
    public function setNombrePropuesta($value, $min = 1, $max = 50)
    {
        // Validación de valor alfabético y longitud
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre de la propuesta debe ser alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre_propuesta = $value;
            return true;
        } else {
            $this->data_error = 'El nombre de la propuesta debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    // Método para establecer la descripción de la propuesta
    public function setDescripcionPropuesta($value, $min = 1, $max = 255)
    {
        // Validación de longitud
        if (Validator::validateLength($value, $min, $max)) {
            $this->descripcion_propuesta = $value;
            return true;
        } else {
            $this->data_error = 'La descripción de la propuesta debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }


    public function setArchivoAdjunto($file, $filename = null)
{
    if (Validator::validatePdfFile($file, 50000000)) { // Ajuste del tamaño máximo a 50 MB
        $this->archivo_adjunto = Validator::getFilename();
        return true;
    } elseif (Validator::getFileError()) {
        $this->data_error = Validator::getFileError();
        return false;
    } elseif ($filename) {
        $this->archivo_adjunto = $filename;
        return true;
    } else {
        $this->archivo_adjunto = 'default.jpg';
        return true;
    }
}

    // Método para establecer el ID del curso
    public function setIdCurso($value)
    {
        // Validación básica de número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->id_curso = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del curso es incorrecto';
            return false;
        }
    }

    // Método para establecer el ID del estado
    public function setIdEstado($value)
    {
        // Validación básica de número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->id_estado = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del estado es incorrecto';
            return false;
        }
    }

    // Método para establecer el ID del tipo de propuesta
    public function setIdTipoPropuesta($value)
    {
        // Validación básica de número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->id_tipo_propuesta = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del tipo de propuesta es incorrecto';
            return false;
        }
    }


    
    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['archivoPropuesta'];
            return true;
        } else {
            $this->data_error = 'Documento inexistente';
            return false;
        }
    }

    public function getFilename()
    {
        return $this->filename;
    }

    // Método para obtener el error de los datos
    public function getDataError()
    {
        return $this->data_error;
    }
}
?>
