import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TeamCard from '../components/cards/cardEquipos';
import TeamDetailsModal from '../components/modals/detalleEquipo';
import * as Constantes from '../../src/utils/Constantes';

const EquiposScreen = ({ navigation }) => {
    const [equipos, setEquipos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
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

    // Función para abrir el modal con detalles del equipo seleccionado
    const openModal = async (teamData) => {
        setSelectedTeam(teamData);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTeam(null);
    };

    useEffect(() => {
        obtenerEquipos(); // Llama a la función para obtener los equipos al cargar el componente
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {equipos.length > 0 ? ( // Verifica si hay elementos en el array
                    equipos.map((equipoItem) => (
                        <TouchableOpacity key={equipoItem.id_equipo} onPress={() => openModal(equipoItem)}>
                            <TeamCard teamData={equipoItem} /> 
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>No se encontraron equipos.</Text>
                )}
            </ScrollView>

            <TeamDetailsModal
                visible={modalVisible}
                onClose={closeModal}
                teamData={selectedTeam}
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
