import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegistroScreen = () => {
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Carnet"
        placeholderTextColor="#888"
        value={carnet}
        onChangeText={setCarnet}
      />
      <TextInput
        style={styles.input}
        placeholder="Especialidad"
        placeholderTextColor="#888"
        value={especialidad}
        onChangeText={setEspecialidad}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />
      <Button title="Registrar" onPress={() => {}} color="#1E90FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 15,
  },
});

export default RegisterScreen;