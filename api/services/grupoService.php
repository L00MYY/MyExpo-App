<?php
// Se incluye la clase del modelo para grupos técnicos.
require_once('../models/data/grupoData.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente para manejar los datos de los grupos técnicos.
    $grupoTecnico = new GrupoTecnicoData();
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);

    // Se verifica la acción a realizar.
    switch ($_GET['action']) {
        case 'searchRows':
            // Validación del parámetro de búsqueda
            if (!isset($_POST['search'])) {
                $result['error'] = 'Parámetro de búsqueda no proporcionado';
            } elseif (!Validator::validateSearch($_POST['search'])) {
                $result['error'] = Validator::getSearchError();
            } else {
                // Llamada al método para buscar registros de grupos técnicos
                $result['dataset'] = $grupoTecnico->searchRows($_POST['search']);
                if ($result['dataset']) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No se encontraron coincidencias';
                }
            }
            break;
        case 'createRow':
            // Validación y creación de un nuevo grupo técnico
            $_POST = Validator::validateForm($_POST);
            if (!$grupoTecnico->setNombreGrupo($_POST['nombreGrupo'])) {
                $result['error'] = $grupoTecnico->getDataError();
            } elseif ($grupoTecnico->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Grupo técnico creado correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al crear el grupo técnico';
            }
            break;
        case 'readAll':
            // Lectura de todos los grupos técnicos registrados
            $result['dataset'] = $grupoTecnico->readAll();
            if ($result['dataset']) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen grupos técnicos registrados';
            }
            break;
        case 'readOne':
            // Lectura de un grupo técnico específico
            if (!isset($_POST['idGrupo'])) {
                $result['error'] = 'ID del grupo técnico no proporcionado';
            } elseif (!$grupoTecnico->setIdGrupo($_POST['idGrupo'])) {
                $result['error'] = $grupoTecnico->getDataError();
            } else {
                $result['dataset'] = $grupoTecnico->readOne();
                if ($result['dataset']) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Grupo técnico no encontrado';
                }
            }
            break;
        case 'updateRow':
            // Actualización de datos de un grupo técnico
            $_POST = Validator::validateForm($_POST);
            if (
                !isset($_POST['idGrupo']) ||
                !$grupoTecnico->setIdGrupo($_POST['idGrupo']) ||
                !$grupoTecnico->setNombreGrupo($_POST['nombreGrupo'])
            ) {
                $result['error'] = $grupoTecnico->getDataError();
            } elseif ($grupoTecnico->updateRow()) {
                $result['status'] = 1;
                $result['message'] = 'Grupo técnico actualizado correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al actualizar el grupo técnico';
            }
            break;
        case 'deleteRow':
            // Eliminación de un grupo técnico
            if (!isset($_POST['idGrupo'])) {
                $result['error'] = 'ID del grupo técnico no proporcionado';
            } elseif (!$grupoTecnico->setIdGrupo($_POST['idGrupo'])) {
                $result['error'] = $grupoTecnico->getDataError();
            } elseif ($grupoTecnico->deleteRow()) {
                $result['status'] = 1;
                $result['message'] = 'Grupo técnico eliminado correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al eliminar el grupo técnico';
            }
            break;
        default:
            $result['error'] = 'Acción no válida';
    }

    // Se obtiene la excepción del servidor de base de datos si ocurrió algún problema.
    $result['exception'] = Database::getException();

    // Se establece el tipo de contenido JSON y se imprime el resultado.
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($result);
} else {
    echo json_encode('Recurso no disponible');
}
?>
