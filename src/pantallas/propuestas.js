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

  /*const openModal = (teamData) => {
    setSelectedTeam(teamData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTeam(null);
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Propuesta PTC</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          {propuestas.length > 0 ? (
            propuestas.map((propuesta, index) => (
              <ProposalCard
                key={index}
                proposalData={{
                    nombre: propuesta.nombre_propuesta,
                    descripcion: propuesta.descripcion_propuesta
                }}
              />
            ))
          ) : (
            <Text>No hay propuesta disponibles</Text>
          )}
        </View>
      </ScrollView>
      {/*<TeamDetailsModal
        visible={modalVisible}
        onClose={closeModal}
        teamData={selectedTeam}
      />*/}
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
        alignItems: 'center', // Centra las cards en la pantalla
      },
      createButton: {
        backgroundColor: '#00CFFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        alignSelf: 'center',
      },
      createButtonText: {
        color: '#fff',
        fontSize: 16,
      },
});

export default PropuestasScreen;