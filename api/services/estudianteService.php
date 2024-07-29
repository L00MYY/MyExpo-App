<?php
// Se incluye la clase del modelo.
require_once('../models/data/alumnoData.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $alumno= new AlumnoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $alumno->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$alumno->setNombre($_POST['nombreEstudiante']) or
                    !$alumno->setCarnet($_POST['carnetEstudiante']) or
                    !$alumno->setCorreo($_POST['correoEstudiante']) or
                    !$alumno->setClave($_POST['claveEstudiante'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($_POST['claveEstudiante'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($alumno->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el alumno';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $alumno->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readOne':
                if (!$alumno->setId($_POST['idEstudiante'])) {
                    $result['error'] = 'Alumno incorrecto';
                } elseif ($result['dataset'] = $alumno->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Alumno inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$alumno->setId($_POST['idEstudiante']) or
                    !$alumno->setNombre($_POST['nombreEstudiante']) or
                    !$alumno->setCarnet($_POST['carnetEstudiante']) or
                    !$alumno->setCorreo($_POST['correoEstudiante'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el alumno';
                }
                break;
            case 'deleteRow':
                if ($_POST['idEstudiante'] == $_SESSION['idEstudiante']) {
                    $result['error'] = 'No se puede eliminar a sí mismo';
                } elseif (!$alumno->setId($_POST['idEstudiante'])) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el alumno';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['correoEstudiante'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoEstudiante'];
                } else {
                    $result['error'] = 'Correo de alumno indefinido';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}