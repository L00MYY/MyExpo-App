<?php
// Se incluye la clase del modelo.
require_once('../models/data/seccionesData.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $seccion = new SeccionData;
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
                } elseif ($result['dataset'] = $seccion->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$seccion->setseccion($_POST['nombreseccion'])
                ) {
                    $result['error'] = $seccion->getDataError();
                } elseif ($seccion->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sección registrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la sección';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $seccion->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen secciones registradas';
                }
                break;
            case 'readOne':
                if (!$seccion->setId($_POST['idSeccion'])) {
                    $result['error'] = 'Sección incorrecta';
                } elseif ($result['dataset'] = $seccion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Sección inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$seccion->setId($_POST['idSeccion']) ||
                    !$seccion->setseccion($_POST['nombreseccion'])
                ) {
                    $result['error'] = $seccion->getDataError();
                } elseif ($seccion->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sección modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la sección';
                }
                break;
            case 'deleteRow':
                if (!$seccion->setId($_POST['idSeccion'])) {
                    $result['error'] = $seccion->getDataError();
                } elseif ($seccion->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sección eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la sección';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        print(json_encode('Acceso denegado'));
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
