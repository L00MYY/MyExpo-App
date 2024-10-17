import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import * as Constantes from '../../src/utils/Constantes';

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [cantidadEquipos, setCantidadEquipos] = useState(0);
  const [equiposConPropuestaAprobada, setEquiposConPropuestaAprobada] = useState(0);
  const [equiposSinPropuestaAprobada, setEquiposSinPropuestaAprobada] = useState(0);

  const ip = Constantes.IP;

  // Función para obtener el nombre del profesor
  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=getUser`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status) {
        if (data.username) {
          setNombre(data.username);
        } else {
          Alert.alert('Error', 'La respuesta del servidor no contiene el nombre del profesor.');
        }
      } else {
        Alert.alert('Error', data.error || 'Error desconocido del servidor.');
      }
    } catch (error) {
      Alert.alert('Error', `Ocurrió un error al obtener los datos del usuario: ${error.message}`);
    }
  };

  // Función para obtener el estado de propuestas de los equipos
  const getEquipos = async () => {
    try {
      const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readEstadosPropuestasEquiposGrafico`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Datos recibidos de la API:', data); // Ver la estructura de los datos

      if (data.status) {
        // Acceder al primer objeto dentro del array 'dataset'
        const equipoData = data.dataset[0]; // Acceder al primer elemento del array

        // Validación de los datos recibidos
        const { total_equipos, equipos_con_propuesta_aprobada, equipos_sin_propuesta_aprobada } = equipoData;

        if (total_equipos != null && equipos_con_propuesta_aprobada != null && equipos_sin_propuesta_aprobada != null) {
          setCantidadEquipos(Number(total_equipos));
          setEquiposConPropuestaAprobada(Number(equipos_con_propuesta_aprobada));
          setEquiposSinPropuestaAprobada(Number(equipos_sin_propuesta_aprobada));
        } else {
          Alert.alert('Error', 'Datos incompletos recibidos de la API.');
        }
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

  // Validación de los datos antes de mostrar la gráfica
  if (
    cantidadEquipos === null ||
    cantidadEquipos === undefined ||
    equiposConPropuestaAprobada === null ||
    equiposConPropuestaAprobada === undefined ||
    equiposSinPropuestaAprobada === null ||
    equiposSinPropuestaAprobada === undefined
  ) {
    return <Text>Cargando datos...</Text>;
  }

  // Datos para la gráfica
  const data = {
    labels: ['Total', 'Con Propuesta\nAprobada\n\n\n\n\n\n', 'Sin aprobadas'], // Simulando saltos de línea
    datasets: [{
      data: [
        cantidadEquipos,
        equiposConPropuestaAprobada,
        equiposSinPropuestaAprobada
      ]
    }]
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.nombre}>¡Bienvenido! {nombre}</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Cantidad de equipos con propuestas</Text>
        <Text style={styles.chartTitle}>aprobadas y no aprobadas del curso</Text>
        <BarChart
          data={data}
          width={400}  // Tamaño ajustado del ancho
          height={250} // Tamaño ajustado del alto
          fromZero={true} // Inicia el gráfico desde 0
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,  // Mantener sin decimales
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeWidth: 0.5,
            },
            barPercentage: 1.1, // Aumentar el ancho de las barras para más espacio entre ellas
            labelFontSize: 2, // Ajuste de tamaño de fuente
          }}
          style={{
            marginVertical: 100,
            borderRadius: 16,
          }}
          verticalLabelRotation={0}
          horizontalLabelRotation={45} // Rotación de etiquetas horizontales
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
