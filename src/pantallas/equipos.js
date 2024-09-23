import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import TeamCard from '../components/cards/cardEquipos';  // Importar el componente TeamCard
import * as Constantes from '../../src/utils/Constantes';  // Asegúrate de tener las constantes donde defines la IP

const PropuestasScreen = ({ navigation }) => {
  const [propuestas, setPropuestas] = useState([]); // Estado para almacenar los equipos
  const ip = Constantes.IP; // Usa tu constante de IP

  // Función para obtener los datos del PHP
  const obtenerPropuestas = async () => {
    try {
      // Ajusta la URL para que coincida con tu estructura de peticiones
      console.log("Fetching data from:", `${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readEquiposPorProfeSesion`);
      const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readEquiposPorProfeSesion`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data); // Log para ver los datos devueltos

      if (data.status === 1) {
        setPropuestas(data.equipos);  // Actualiza el estado con los datos obtenidos
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
      <TextInput style={styles.input} placeholder="Curso:" />
      <ScrollView style={styles.scrollView}>
        {propuestas.length > 0 ? (
          propuestas.map((propuesta, index) => (
            <TeamCard
              key={index}
              teamData={{
                team_name: propuesta.equipo,              // ID del equipo
                coordinator_name: propuesta.coordinador,  // Nombre del coordinador
                members_count: propuesta.numero_integrantes,  // Número de integrantes
                estado: propuesta.estado_equipo,          // Estado del equipo
                curso: propuesta.nombre_curso             // Nombre del curso
              }}
            />
          ))
        ) : (
          <Text>No hay equipos disponibles</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('DetalleEquipo')}>
        <Text style={styles.createButtonText}>Crear Equipo</Text>
      </TouchableOpacity>
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
