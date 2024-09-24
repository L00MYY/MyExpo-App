import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProposalCard from '../components/cards/cardPropuesta'; // Asegúrate de que esta ruta sea correcta
import * as Constantes from '../../src/utils/Constantes';
import TeamDetailsModal from '../components/modals/detalleEquipo';

const PropuestasScreen = ({ navigation }) => {
    const [propuestas, setPropuestas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const ip = Constantes.IP;

  const obtenerPropuestas = async () => {
    try {
      const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readPropuestasProfesor`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Datos de la respuesta:", data);

      if (data.status === 1) {
        setPropuestas(data.dataset || []);
      } else {
        console.log("No se pudieron obtener los equipos. Status:", data.status);
      }
    } catch (error) {
      console.error("Error al obtener los equipos:", error);
    }
  };

  useEffect(() => {
    obtenerPropuestas();
  }, []);

  const openModal = (teamData) => {
    setSelectedTeam(teamData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTeam(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipos PTC</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          {propuestas.length > 0 ? (
            propuestas.map((propuesta, index) => (
              <ProposalCard
                key={index}
                teamData={{
                  team_name: propuesta.equipo,
                  coordinator_name: propuesta.coordinador,
                  members_count: propuesta.numero_integrantes
                }}
                onPress={() => openModal({
                  team_name: propuesta.equipo,
                  coordinator_name: propuesta.coordinador,
                  members_count: propuesta.numero_integrantes
                })}
              />
            ))
          ) : (
            <Text>No hay equipos disponibles</Text>
          )}
        </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
    },
});

export default PropuestasScreen;