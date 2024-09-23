import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Constantes from '../../src/utils/Constantes';

export default function Home({ navigation }) {

  const [nombre, setNombre]=useState("")

  const ip = Constantes.IP;

  //Funcion para obtener el nombre del usuario
  const getUser = async () => {
    try {
        const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=getUser`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Server response:', data);


        if (data.status) {
            if (data.username) {
                setNombre(data.username);
            } else {
                setAlertTitle('Error');
                setAlertMessage('La respuesta del servidor no contiene el nombre del profesor.');
                setShowAlert(true);
            }
        } else {
            setAlertTitle('Error');
            setAlertMessage(data.error || 'Error desconocido del servidor.');
            setShowAlert(true);
        }
    } catch (error) {
        setAlertTitle('Error');
        setAlertMessage(`Ocurrió un error al obtener los datos del usuario: ${error.message}`);
        setShowAlert(true);
    }
};

     // UseEffect para obtener el nombre del usuario al montar el componente
useEffect(() => {
    getUser();
}, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" type="material" color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.nombre}>Bienvenido: {nombre}</Text>
      </View>
      <View style={styles.notifications}>
        <Text style={styles.notificationsLabel}>Notificaciones</Text>
        <Text style={styles.notification}>+ Nuevo Equipo Creado</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
    flex: 1,
  },
  progressBar: {
    flex: 2,
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 10,
  },
  progress: {
    height: '100%',
  },
  notifications: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  notificationsLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notification: {
    marginLeft: 10,
  },
});