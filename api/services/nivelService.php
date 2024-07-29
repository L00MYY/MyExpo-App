<?php
// Se incluye la clase del modelo.
require_once('../models/data/nivelData.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $nivel = new NivelData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])
    ) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $nivel->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$nivel->setNombre($_POST['nombreNivel']) 
                ) {
                    $result['error'] = $nivel->getDataError();
                }   elseif ($nivel->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Nivel creada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el Nivel';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $nivel->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen niveles registradas';
                }
                break;
            case 'readOne':
                if (!$nivel ->setId($_POST['idNivel'])) {
                    $result['error'] = 'Administrador incorrecto';
                } elseif ($result['dataset'] = $nivel->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Nivel inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$nivel->setId($_POST['idNivel']) or
                    !$nivel->setNombre($_POST['nombreNivel'])

                ) {
                    $result['error'] = $nivel->getDataError();
                } elseif ($nivel->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Nivel modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el Nivel';
                }
                break;
            case 'deleteRow':
                if (!$nivel->setId($_POST['idNivel'])) {
                    $result['error'] = $nivel->getDataError();
                } elseif ($nivel->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Nivel eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el Nivel';
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

