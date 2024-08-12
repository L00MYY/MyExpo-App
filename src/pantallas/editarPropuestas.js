import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import { usePropuestas } from '../components/propuestasContext';
import { useNavigation } from '@react-navigation/native';

const EditarPropuesta = ({ route }) => {
  const { id } = route.params;
  const { propuestas, actualizarPropuesta } = usePropuestas();
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [justificacion, setJustificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoPropuesta, setTipoPropuesta] = useState('');
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    const propuesta = propuestas[id];
    if (propuesta) {
      setNombre(propuesta.nombre);
      setObjetivos(propuesta.objetivos);
      setJustificacion(propuesta.justificacion);
      setDescripcion(propuesta.descripcion);
      setTipoPropuesta(propuesta.tipoPropuesta);
      setEstado(propuesta.estado);
    }
  }, [id]);

  const handleActualizarPropuesta = () => {
    const propuestaActualizada = {
      nombre,
      objetivos,
      justificacion,
      descripcion,
      tipoPropuesta,
      estado,
    };
    actualizarPropuesta(id, propuestaActualizada);
    navigation.navigate('ListaPropuestas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Propuesta</Text>
      {/* Inputs para los datos */}
      {/* ... mismos campos que en el código original ... */}
      <Button
        title="Actualizar"
        onPress={handleActualizarPropuesta}
      />
    </View>
  );
};

//Estilo de la pantalla de editar propuesta 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f4f4f4',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#555',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 15,
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    switchLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#555',
      marginRight: 10,
    },
    button: {
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '600',
    },
  });
  

export default EditarPropuesta;
