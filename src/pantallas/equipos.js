import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';

const PropuestasScreen = () => {
  const propuestas = [
    { nombre: 'Proyecto 1', descripcion: 'Proyecto se basa en realizar....' },
    { nombre: 'Proyecto 2', descripcion: 'Proyecto se basa en realizar....' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <Text style={styles.title}>Equipos PTC</Text>
      <TextInput style={styles.input} placeholder="Tipo:" />
      <ScrollView style={styles.scrollView}>
        {propuestas.map((propuesta, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Nombre: {propuesta.nombre}</Text>
            <Text style={styles.cardDescription}>Descripción: {propuesta.descripcion}</Text>
            <TouchableOpacity style={styles.viewButton} onPress={() => {}}>
              <Text style={styles.viewButtonText}>Ver</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.createButton} onPress={() => {}}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },
  backButton: {
    color: '#fff',
    fontSize: 24,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  profileIcon: {
    color: '#fff',
    fontSize: 24,
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
  viewButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007BFF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  viewButtonText: {
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
