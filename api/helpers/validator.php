<?php
// Archivo para realizar las validaciones de los datos de entrada 
class Validator
{
    // Atributos para manejar validaciones
    private static $filename = null;
    private static $search_value = null;
    private static $password_error = null;
    private static $file_error = null;
    private static $search_error = null;

    // Método para obtener el error al validar una contraseña.
    public static function getPasswordError()
    {
        return self::$password_error;
    }

    // Método para obtener el nombre del archivo validado.
    public static function getFilename()
    {
        return self::$filename;
    }

    // Método para obtener el error al validar un archivo.
    public static function getFileError()
    {
        return self::$file_error;
    }

    // Método para obtener el valor de búsqueda.
    public static function getSearchValue()
    {
        return self::$search_value;
    }

    // Método para obtener el error al validar una búsqueda.
    public static function getSearchError()
    {
        return self::$search_error;
    }

    // Método para sanear todos los campos de un formulario
    public static function validateForm($fields)
    {
        foreach ($fields as $index => $value) {
            $value = trim($value);
            $fields[$index] = $value;
        }
        return $fields;
    }

    // Método para validar una búsqueda
    public static function validateSearch($value)
    {
        if (trim($value) == '') {
            self::$search_error = 'Ingrese un valor para buscar';
            return false;
        } elseif (str_word_count($value) > 3) {
            self::$search_error = 'La búsqueda contiene más de 3 palabras';
            return false;
        } elseif (self::validateString($value)) {
            self::$search_value = $value;
            return true;
        } else {
            self::$search_error = 'La búsqueda contiene caracteres prohibidos';
            return false;
        }
    }

    // Método para validar un número natural 
    public static function validateNaturalNumber($value)
    {
        // Se verifica que el valor sea un número entero mayor o igual a uno.
        if (filter_var($value, FILTER_VALIDATE_INT, array('options' => array('min_range' => 1)))) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar un correo
    public static function validateEmail($value)
    {
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar longitud  
    public static function validateLength($value, $min, $max)
    {
        // Se verifica la longitud de la cadena de texto.
        if (strlen($value) >= $min && strlen($value) <= $max) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar un dato booleano
    public static function validateBoolean($value)
    {
        if ($value == 1 || $value == 0) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar una cadena de texto
    public static function validateString($value)
    {
        // Se verifica el contenido y la longitud de acuerdo con la base de datos.
        if (preg_match('/^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ\s\,\;\.]+$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    public static function validateUUID2($value)
    {
        // Se verifica el contenido y la longitud de acuerdo con la base de datos.
        if (preg_match('/^[a-zA-Z0-9\-]+$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar un dato alfabético
    public static function validateAlphabetic($value)
    {
        // Se verifica el contenido y la longitud de acuerdo con la base de datos.
        if (preg_match('/^[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]+$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar un dato alfanumérico
    public static function validateAlphanumeric($value)
    {
        // Se verifica el contenido y la longitud de acuerdo con la base de datos.
        if (preg_match('/^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ\s]+$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar un UUID
    public static function validateUUID($value)
    {
        // Verifica si el valor es un UUID válido (versión 4)
        if (preg_match('/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar una contraseña en registro-login 
    public static function validatePassword($value)
    {
        // Se verifica la longitud mínima.
        if (strlen($value) < 8) {
            self::$password_error = 'La contraseña es menor a 8 caracteres';
            return false;
        } elseif (strlen($value) <= 50) {
            return true;
        } else {
            self::$password_error = 'La contraseña es mayor a 50 caracteres';
            return false;
        }
    }

    // Método para validar el formato del DUI
    public static function validateDUI($value)
    {
        // Se verifica que el número tenga el formato 00000000-0.
        if (preg_match('/^[0-9]{8}[-][0-9]{1}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar un número telefónico
    public static function validatePhone($value)
    {
        // Se verifica que el número tenga el formato 0000-0000 y que inicie con 2, 6 o 7.
        if (preg_match('/^[2,6,7]{1}[0-9]{3}[-][0-9]{4}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar una fecha
    public static function validateDate($value)
    {
        // Se dividen las partes de la fecha y se guardan en un arreglo con el siguiente orden: año, mes y día.
        $date = explode('-', $value);
        if (checkdate($date[1], $date[2], $date[0])) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar un archivo al momento de subirlo al servidor
    public static function saveFile($file, $path)
    {
        if (!$file) {
            return false;
        } elseif (move_uploaded_file($file['tmp_name'], $path . self::$filename)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar el cambio de un archivo en el servidor 
    public static function changeFile($file, $path, $old_filename)
    {
        if (!self::saveFile($file, $path)) {
            return false;
        } elseif (self::deleteFile($path, $old_filename)) {
            return true;
        } else {
            return false;
        }
    }

    // Método para validar un archivo al momento de borrarlo del servidor
    public static function deleteFile($path, $filename)
    {
        if ($filename == 'default.png') {
            return true;
        } elseif (@unlink($path . $filename)) {
            return true;
        } else {
            return false;
        }
    }

   // Método para validar un archivo PDF
public static function validatePdfFile($file, $max_size)
{
    if (is_uploaded_file($file['tmp_name'])) {
        // Se comprueba si el archivo tiene un tamaño mayor al permitido.
        if ($file['size'] > $max_size) {
            self::$file_error = 'El tamaño del archivo debe ser menor o igual a ' . $max_size . ' bytes';
            return false;
        }

        // Se obtiene la extensión del archivo (.pdf) y se convierte a minúsculas.
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        // Se verifica si la extensión es PDF.
        if ($extension != 'pdf') {
            self::$file_error = 'El archivo debe tener formato PDF';
            return false;
        }

        return true;
    } else {
        return false;
    }
}
}
?>
