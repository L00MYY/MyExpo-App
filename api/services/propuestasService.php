<?php
// Se incluye la clase del modelo para propuestas.
require_once('../models/data/propuestasData.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente para manejar los datos de las propuestas.
    $propuesta = new PropuestaData();
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
                // Llamada al método para buscar registros de propuestas
                $result['dataset'] = $propuesta->searchRows($_POST['search']);
                if ($result['dataset']) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No se encontraron coincidencias';
                }
            }
            break;
            case 'createRow':
                // Validación y creación de una nueva propuesta
                $_POST = Validator::validateForm($_POST);
                
                // Inicializar un array para almacenar errores o mensajes de resultado
                $result = array();
            
                // Validar y establecer el nombre de la propuesta
                if (!$propuesta->setNombrePropuesta($_POST['nombrePropuesta'])) {
                    $result['error'] = $propuesta->getDataError();
                } 
                // Validar y establecer la descripción de la propuesta
                elseif (!$propuesta->setDescripcionPropuesta($_POST['DescPropuestaInsit'])) {
                    $result['error'] = $propuesta->getDataError();
                } 
                // Validar y establecer el archivo adjunto (PDF)
                //elseif (empty($_FILES['archivoAdjunto']['tmp_name']) || !is_uploaded_file($_FILES['archivoAdjunto']['tmp_name'])) {
                //    $result['error'] = 'No se ha adjuntado ningún archivo PDF.';
                //} elseif (!$propuesta->setArchivoAdjunto($_FILES['archivoAdjunto'])) {
                //    $result['error'] = $propuesta->getDataError();
                //} 
                // Validar y establecer el estado de la propuesta
                elseif (!$propuesta->setIdEstado($_POST['idEstado'])) {
                    $result['error'] = $propuesta->getDataError(); 
                } 
                // Intentar crear la nueva propuesta en la base de datos
                elseif ($propuesta->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Propuesta creada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la propuesta';
                }
                break;
            
        case 'readAll':
            // Lectura de todas las propuestas registradas
            $result['dataset'] = $propuesta->readAll();
            if ($result['dataset']) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen propuestas registradas';
            }
            break;
        case 'readOne':
            // Lectura de una propuesta específica
            if (!isset($_POST['idPropuesta'])) {
                $result['error'] = 'ID de la propuesta no proporcionado';
            } elseif (!$propuesta->setIdPropuesta($_POST['idPropuesta'])) {
                $result['error'] = $propuesta->getDataError();
            } else {
                $result['dataset'] = $propuesta->readOne();
                if ($result['dataset']) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Propuesta no encontrada';
                }
            }
            break;
        case 'updateRow':
            // Actualización de datos de una propuesta
            $_POST = Validator::validateForm($_POST);
            if (
                !isset($_POST['idPropuestaInsti']) ||
                !$propuesta->setIdPropuesta($_POST['idPropuestaInsti']) ||
                !$propuesta->setNombrePropuesta($_POST['nombrePropuesta']) ||
                !$propuesta->setDescripcionPropuesta($_POST['DescPropuestaInsit']) ||
                //!$propuesta->setArchivoAdjunto($_POST['archivoAdjunto']) ||
                //!$propuesta->setIdCurso($_POST['idCurso']) ||
                !$propuesta->setIdEstado($_POST['idEstado'])
                //!$propuesta->setIdTipoPropuesta($_POST['idTipoPropuesta'])
            ) {
                $result['error'] = $propuesta->getDataError();
            } elseif ($propuesta->updateRow()) {
                $result['status'] = 1;
                $result['message'] = 'Propuesta actualizada correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al actualizar la propuesta';
            }
            break;
        case 'deleteRow':
            // Eliminación de una propuesta
            if (!isset($_POST['idPropuesta'])) {
                $result['error'] = 'ID de la propuesta no proporcionado';
            } elseif (!$propuesta->setIdPropuesta($_POST['idPropuesta'])) {
                $result['error'] = $propuesta->getDataError();
            } elseif ($propuesta->deleteRow()) {
                $result['status'] = 1;
                $result['message'] = 'Propuesta eliminada correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al eliminar la propuesta';
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
