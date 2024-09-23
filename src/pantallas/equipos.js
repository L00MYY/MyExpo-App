import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TeamCard from '../components/cards/cardEquipos';  // Importar el componente TeamCard
import * as Constantes from '../../src/utils/Constantes';  // Asegúrate de tener las constantes donde defines la IP

const PropuestasScreen = ({ navigation }) => {
  const [propuestas, setPropuestas] = useState([]); // Estado para almacenar los equipos
  const ip = Constantes.IP; // Usa tu constante de IP

  const obtenerPropuestas = async () => {
    try {
      const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readEquiposPorProfeSesion`, {
        method: 'POST',
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.status === 1) {
        setPropuestas(data.dataset || []);  // Cambia a data.dataset
      } else {
        console.log("No se pudieron obtener los equipos. Status:", data.status);
      }
    } catch (error) {
      console.error("Error al obtener los equipos:", error);
    }
  };

  // useEffect para ejecutar la función obtenerPropuestas al cargar el componente
  useEffect(() => {
    obtenerPropuestas();
  }, []); // [] asegura que se ejecute solo una vez al montar el componente

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipos PTC</Text>
      <ScrollView style={styles.scrollView}>
        {propuestas.length > 0 ? (
          propuestas.map((propuesta, index) => (
            <TeamCard
              key={index}
              teamData={{
                team_name: propuesta.equipo,              // ID del equipo
                coordinator_name: propuesta.coordinador,  // Nombre del coordinador
                members_count: propuesta.numero_integrantes  // Número de integrantes
              }}
            />
          ))
        ) : (
          <Text>No hay equipos disponibles</Text>
        )}
      </ScrollView>
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
