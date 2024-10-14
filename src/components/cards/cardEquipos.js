import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TeamCard = ({ teamData, onPressIntegrantes, onPressPropuestas }) => {
  if (!teamData) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://img.icons8.com/ios/452/task.png' }} 
          style={styles.icon} 
        />
        <Text style={styles.title}>
          Equipo: {teamData.nombre_equipo_correlativo}, Coordinador: {teamData.nombre_coordinador}
        </Text>
      </View>
      <Text style={styles.subtitle}>Integrantes: {teamData.cantidad_integrantes}</Text>
      <Text style={styles.subtitle}>{teamData.proyecto_seleccionado}</Text>
      <TouchableOpacity style={styles.button} onPress={onPressIntegrantes}>
        <Text style={styles.buttonText}>Ver integrantes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressPropuestas}>
        <Text style={styles.buttonText}>Ver propuesta del equipo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TeamCard;
