import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CrearPropuesta = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [justificacion, setJustificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoPropuesta, setTipoPropuesta] = useState('');
  const [estado, setEstado] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Crear Propuesta" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
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

            <Button
              title="Añadir"
              onPress={() => {
                setModalVisible(false); // Cerrar modal al añadir
                navigation.navigate('Propuesta'); // Navegar a la pantalla de Propuesta
                alert('Propuesta añadida');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
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
