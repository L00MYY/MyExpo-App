import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TeamCard from '../components/cards/cardEquipos';
import IntegrantesModal from '../components/modals/IntegrantesModal';
import PropuestasModal from '../components/modals/PropuestasModal';
import * as Constantes from '../../src/utils/Constantes';

const EquiposScreen = ({ navigation }) => {
    const [equipos, setEquipos] = useState([]);
    const [integrantesModalVisible, setIntegrantesModalVisible] = useState(false);
    const [propuestasModalVisible, setPropuestasModalVisible] = useState(false);
    const [selectedIntegrantes, setSelectedIntegrantes] = useState([]);
    const [selectedPropuestas, setSelectedPropuestas] = useState([]);

    const ip = Constantes.IP;

    // Función para obtener los equipos asociados al profesor
    const obtenerEquipos = async () => {
        try {
            const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readEquiposPorProfeSesion`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 1) {
                setEquipos(data.dataset); // Guarda los equipos obtenidos
            } else {
                console.log("No se pudieron obtener los equipos. Status:", data.status);
                setEquipos([]); // Asegura que la lista esté vacía si no se obtienen datos
            }
        } catch (error) {
            console.error("Error al obtener los equipos:", error);
            setEquipos([]); // Maneja el error dejando la lista vacía
        }
    };

    const obtenerIntegrantesPorEquipo = async (equipoId) => {
        console.log("Obteniendo integrantes para el equipo:", equipoId); // Log
        try {
            const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readIntegrantesPorEquipo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `equipoId=${equipoId}`,
            });
            const data = await response.json();
            if (data.status === 1) {
                setSelectedIntegrantes(data.dataset);
                setIntegrantesModalVisible(true); // Verifica que se ejecute esta línea
            }
        } catch (error) {
            console.error("Error al obtener los integrantes:", error);
        }
    };

    const obtenerPropuestasPorEquipo = async (equipoId) => {
        console.log("Obteniendo propuestas para el equipo:", equipoId);
        try {
            const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readPropuestasPorEquipo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `equipoId=${equipoId}`,
            });
            const data = await response.json();
            
            console.log("Respuesta completa de la API:", data); // Nuevo log para ver la respuesta completa
            
            if (data.status === 1) {
                setSelectedPropuestas(data.dataset);
                console.log("Propuestas almacenadas en el estado:", data.dataset); // Este log debería aparecer si todo funciona correctamente
                setPropuestasModalVisible(true);
            } else {
                console.log("No se encontraron propuestas. Mensaje de la API:", data.message); // Si el status no es 1, imprime el mensaje de la API
            }
        } catch (error) {
            console.error("Error al obtener las propuestas:", error);
        }
    };
    

    // Funciones para cerrar los modales
    const closeIntegrantesModal = () => {
        setIntegrantesModalVisible(false);
        setSelectedIntegrantes([]);
    };

    const closePropuestasModal = () => {
        setPropuestasModalVisible(false);
        setSelectedPropuestas([]);
    };

    useEffect(() => {
        obtenerEquipos(); // Llama a la función para obtener los equipos al cargar el componente
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {equipos.length > 0 ? (
                    equipos.map((equipoItem) => (
                        <TeamCard
                            key={equipoItem.id_equipo}
                            teamData={equipoItem}
                            onPressIntegrantes={() => obtenerIntegrantesPorEquipo(equipoItem.id_equipo)}
                            onPressPropuestas={() => obtenerPropuestasPorEquipo(equipoItem.id_equipo)}
                        />
                    ))
                ) : (
                    <Text>No se encontraron equipos.</Text>
                )}
            </ScrollView>

            <IntegrantesModal
                visible={integrantesModalVisible}
                onClose={closeIntegrantesModal}
                integrantes={selectedIntegrantes}
            />
            <PropuestasModal
                visible={propuestasModalVisible}
                onClose={closePropuestasModal}
                propuestas={selectedPropuestas}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default EquiposScreen;
