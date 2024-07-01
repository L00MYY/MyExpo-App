import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PropuestasScreen = () => {
  const navigation = useNavigation();
  const propuestas = [
    { nombre: 'Proyecto 1', descripcion: 'Proyecto se basa en realizar....' },
    { nombre: 'Proyecto 2', descripcion: 'Proyecto se basa en realizar....' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Propuestas</Text>
      <TextInput style={styles.input} placeholder="Tipo:" />
      <ScrollView style={styles.scrollView}>
        {propuestas.map((propuesta, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Nombre: {propuesta.nombre}</Text>
            <Text style={styles.cardDescription}>Descripción: {propuesta.descripcion}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => {}}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('crearPropuesta')}>
        <Text style={styles.createButtonText}>Crear Propuesta</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  editButton: {
    position: 'absolute',
    right: 16,
    bottom: 18,
    backgroundColor: '#007BFF',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
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
