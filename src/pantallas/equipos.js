import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TeamCard from '../components/cards/cardEquipos';  
import TeamDetailsModal from '../components/modals/detalleEquipo'; // Import the modal
import * as Constantes from '../../src/utils/Constantes'; 

const PropuestasScreen = ({ navigation }) => {
  const [propuestas, setPropuestas] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const ip = Constantes.IP; 

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
      console.log("Datos de la respuesta:", data); // Verifica la estructura de los datos
  
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
        {propuestas.length > 0 ? (
          propuestas.map((propuesta, index) => (
            <TeamCard
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
              })} // Pass the data to the modal
            />
          ))
        ) : (
          <Text>No hay equipos disponibles</Text>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  scrollView: {
    flex: 1,
    marginBottom: 16, 
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
