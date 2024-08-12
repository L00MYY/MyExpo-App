import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView } from 'react-native';
import { usePropuestas } from '../components/propuestasContext';
import { useNavigation } from '@react-navigation/native';

const CrearPropuesta = () => {
  const { agregarPropuesta } = usePropuestas();
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [justificacion, setJustificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoPropuesta, setTipoPropuesta] = useState('');
  const [estado, setEstado] = useState(false);

  const handleAgregarPropuesta = () => {
    const nuevaPropuesta = {
      nombre,
      objetivos,
      justificacion,
      descripcion,
      tipoPropuesta,
      estado,
    };
    agregarPropuesta(nuevaPropuesta);
    // Limpiar campos del formulario 
    setNombre('');
    setObjetivos('');
    setJustificacion('');
    setDescripcion('');
    setTipoPropuesta('');
    setEstado(false);

    // Navegar a la pantalla 'Propuesta' después de agregar
    navigation.navigate('Propuesta');
    alert('Propuesta añadida');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Propuesta</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput 
        style={styles.input} 
        value={nombre} 
        onChangeText={setNombre} 
        placeholder="Nombre de la propuesta" 
      />

      <Text style={styles.label}>Objetivos:</Text>
      <TextInput 
        style={styles.input} 
        value={objetivos} 
        onChangeText={setObjetivos} 
        placeholder="Objetivos de la propuesta" 
      />

      <Text style={styles.label}>Justificación:</Text>
      <TextInput 
        style={styles.input} 
        value={justificacion} 
        onChangeText={setJustificacion} 
        placeholder="Justificación de la propuesta" 
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput 
        style={styles.input} 
        value={descripcion} 
        onChangeText={setDescripcion} 
        placeholder="Descripción de la propuesta" 
      />

      <Text style={styles.label}>Tipo propuesta:</Text>
      <TextInput 
        style={styles.input} 
        value={tipoPropuesta} 
        onChangeText={setTipoPropuesta} 
        placeholder="Tipo de propuesta" 
      />

      <Text style={styles.label}>Estado:</Text>
      <Switch 
        value={estado} 
        onValueChange={setEstado} 
      />

      <Button
        title="Añadir"
        onPress={handleAgregarPropuesta} // Llama a la función handleAgregarPropuesta
      />
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
    borderColor: '#fff', 
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
});

export default CrearPropuesta;
