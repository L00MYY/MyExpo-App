import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { usePropuestas } from '../components/propuestasContext';
import { useNavigation } from '@react-navigation/native';

//Contenedor para almacenar o listar las orpuestas creadas 
const ListaPropuestas = () => {
  const { propuestas, eliminarPropuesta } = usePropuestas();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Propuestas</Text>
      <FlatList
        data={propuestas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.propuestaContainer}>
            <Text style={styles.propuestaText}>{item.nombre}</Text>
            <Button
              title="Editar"
              onPress={() => navigation.navigate('EditarPropuesta', { id: index })}
            />
            <Button
              title="Eliminar"
              onPress={() => eliminarPropuesta(index)}
            />
          </View>
        )}
      />
    </View>
  );
};

//Creacion del estilo de la lista donde se van a cargar las propuestas ya creadas 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f4f4f4',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    propuestaContainer: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    propuestaText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#333',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
    },
  });
  

export default ListaPropuestas;
