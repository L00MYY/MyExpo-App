import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView } from 'react-native';

const DetalleEquipo = () => {
  const [nombre, setNombre] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [justificacion, setJustificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoPropuesta, setTipoPropuesta] = useState('');
  const [estado, setEstado] = useState(false);
  const [integrantes, setIntegrantes] = useState(['', '', '', '']);

  const handleIntegranteChange = (text, index) => {
    const newIntegrantes = [...integrantes];
    newIntegrantes[index] = text;
    setIntegrantes(newIntegrantes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <Text style={styles.label}>Integrantes:</Text>
      {integrantes.map((integrante, index) => (
        <View key={index} style={styles.integranteContainer}>
          <TextInput
            style={styles.input}
            value={integrante}
            onChangeText={(text) => handleIntegranteChange(text, index)}
            placeholder={`Integrante ${index + 1}`}
          />
          <Text style={styles.coordinador}>Coordinador</Text>
        </View>
      ))}

      <Button title="Añadir" onPress={() => alert('Añadir nuevo integrante')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
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
  },
  integranteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  coordinador: {
    marginLeft: 10,
  },
});

export default DetalleEquipo;
