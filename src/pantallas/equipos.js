import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TeamCard from '../components/cards/cardEquipos';
import TeamDetailsModal from '../components/modals/detalleEquipo';
import * as Constantes from '../../src/utils/Constantes';

const PropuestasScreen = ({ navigation }) => {
  const [propuestas, setPropuestas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const ip = Constantes.IP;

  // Función para obtener las propuestas
  const obtenerPropuestas = async () => {
    try {
      const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readEquiposPorProfeSesion`, {
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

  const obtenerIntegrantes = async (equipoId) => {
    try {
        const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readIntegrantesPorEquipo`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ equipoId }), // Asegúrate de que aquí estás enviando el equipoId
        });

        if (!response.ok) {
            throw new Error(`Error HTTP! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Integrantes del equipo:", data);

        return data.status === 1 ? data.dataset : []; // Devuelve los integrantes si existen
    } catch (error) {
        console.error("Error al obtener los integrantes:", error);
        return [];
    }
};

  useEffect(() => {
    obtenerPropuestas();
  }, []);

  // Abre el modal y carga los integrantes
  const openModal = async (teamData) => {
		try {
			const integrantes = await obtenerIntegrantes(teamData.team_id); // Aquí pasamos el ID del equipo
	
			// Incluimos los integrantes en los datos del equipo antes de abrir el modal
			setSelectedTeam({
				...teamData,
				integrantes,  // Aquí guardamos los integrantes
			});
			setModalVisible(true);
		} catch (error) {
			console.error('Error al abrir el modal:', error.message);
		}
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
              <TeamCard
                key={index}
                teamData={{
                  team_id: propuesta.equipo,  // ID del equipo
                  team_name: propuesta.equipo,
                  coordinator_name: propuesta.coordinador,
                  members_count: propuesta.numero_integrantes,
                }}
                onPress={() => openModal({
                  team_id: propuesta.equipo,  // Aquí pasamos el ID del equipo
                  team_name: propuesta.equipo,
                  coordinator_name: propuesta.coordinador,
                  members_count: propuesta.numero_integrantes,
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  cardContainer: {
    alignItems: 'center',
  },
});

export default PropuestasScreen;
