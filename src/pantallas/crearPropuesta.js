import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView } from 'react-native';

const CrearPropuesta = () => {
  const [nombre, setNombre] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [justificacion, setJustificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoPropuesta, setTipoPropuesta] = useState('');
  const [estado, setEstado] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Propuesta</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Objetivos:</Text>
      <TextInput style={styles.input} value={objetivos} onChangeText={setObjetivos} />

      <Text style={styles.label}>Justificación:</Text>
      <TextInput style={styles.input} value={justificacion} onChangeText={setJustificacion} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} />

      <Text style={styles.label}>Tipo propuesta:</Text>
      <TextInput style={styles.input} value={tipoPropuesta} onChangeText={setTipoPropuesta} />

      <Text style={styles.label}>Estado:</Text>
      <Switch value={estado} onValueChange={setEstado} />

      <Button title="Añadir" onPress={() => alert('Propuesta añadida')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
});

export default CrearPropuesta;
