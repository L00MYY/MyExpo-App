<?php
// Se incluye la clase del modelo.
require_once('../models/data/profesorData.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $profesor= new ProfesorData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idProfesor'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $profesor->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$profesor->setNombre($_POST['nombreProfesor']) or
                    !$profesor->setCarnet($_POST['carnetProfesor']) or
                    !$profesor->setCorreo($_POST['correoProfesor']) or
                    !$profesor->setClave($_POST['claveProfesor'])
                ) {
                    $result['error'] = $profesor->getDataError();
                } elseif ($_POST['claveProfesor'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($profesor->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Profesor creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el profesor';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $profesor->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen profesores registrados';
                }
                break;
                case 'readOne':
                    if (!$profesor->setId($_POST['idProfesores'])) {
                        $result['error'] = 'Profesor incorrecto';
                    } elseif ($result['dataset'] = $profesor->readOne()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Profesor inexistente';
                    }
                    break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$profesor->setId($_POST['idProfesor']) or
                    !$profesor->setNombre($_POST['nombreProfesor']) or
                    !$profesor->setCarnet($_POST['carnetProfesor']) or
                    !$profesor->setCorreo($_POST['correoProfesor'])
                ) {
                    $result['error'] = $profesor->getDataError();
                } elseif ($profesor->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Profesor modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el profesor';
                }
                break;
            case 'deleteRow':
                if ($_POST['idProfesor'] == $_SESSION['idProfesores']) {
                    $result['error'] = 'No se puede eliminar a sí mismo';
                } elseif (!$profesor->setId($_POST['idProfesores'])) {
                    $result['error'] = $profesor->getDataError();
                } elseif ($profesor->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Profesor eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el profesor';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['correoProfesor'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoProfesor'];
                } else {
                    $result['error'] = 'Correo de profesor indefinido';
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
    } else {
         // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
         switch ($_GET['action']) {
            case 'readUsers':
                if ($profesor->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un administrador para comenzar';
                }
                break;
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$profesor->setNombre($_POST['nombreProfesor']) or
                    !$profesor->setCorreo($_POST['correoProfesor']) or
                    !$profesor->setClave($_POST['claveProfesor'])
                ) {
                    $result['error'] = $profesor->getDataError();
                } elseif ($_POST['claveAdministrador'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($profesor->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el administrador';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($profesor->checkUser($_POST['correo'], $_POST['clave'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
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