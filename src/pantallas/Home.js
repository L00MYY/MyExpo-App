import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { BarChart } from 'react-native-chart-kit';
import * as Constantes from '../../src/utils/Constantes';

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [equipos, setEquipos] = useState([]);

  const ip = Constantes.IP;

  const getUser = async () => {
    // Código existente para obtener el nombre del usuario...
  };

  const getEquipos = async () => {
    try {
      const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=getChartData`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status) {
        setCantidadEquipos(data.cantidad_equipos); // Asegúrate de que la respuesta tenga la propiedad correcta
      } else {
        Alert.alert('Error', data.error || 'Error desconocido del servidor.');
      }
    } catch (error) {
      Alert.alert('Error', `Ocurrió un error al obtener los equipos: ${error.message}`);
    }
  };

  useEffect(() => {
    getUser();
    getEquipos();
  }, []);

  const handleLogout = async () => {
    // Código existente para manejar el logout...
  };

  const [cantidadEquipos, setCantidadEquipos] = useState(0); // Inicializa un estado para la cantidad de equipos

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" type="material" color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.nombre}>Bienvenido: {nombre}</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Cantidad de Equipos Registrados</Text>
        <BarChart
          data={{
            labels: ['Equipos Registrados'],
            datasets: [
              {
                data: [cantidadEquipos] // Usa el estado actualizado
              }
            ]
          }}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      <View style={styles.notifications}>
        <Text style={styles.notificationsLabel}>Notificaciones</Text>
        <Text style={styles.notification}>+ Nuevo Equipo Creado</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notifications: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  notificationsLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notification: {
    marginLeft: 10,
  },
});
