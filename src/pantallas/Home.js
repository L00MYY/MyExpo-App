import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../img/logo_banner.png')} 
          style={styles.logo}
        />
        <Icon name="person-outline" type="material" color="#000" />
      </View>
      <Text style={styles.welcomeText}>¡Bienvenido (nombre)!</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <Icon name="group" type="material" color="#FF4500" />
          <Text style={styles.label}>Equipos Registrados</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '50%', backgroundColor: '#FF4500' }]} />
          </View>
        </View>
        <View style={styles.row}>
          <Icon name="description" type="material" color="#FFA500" />
          <Text style={styles.label}>Proyectos Registrados</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '50%', backgroundColor: '#FFA500' }]} />
          </View>
        </View>
        <View style={styles.row}>
          <Icon name="record-voice-over" type="material" color="#32CD32" />
          <Text style={styles.label}>Propuestas Creadas</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '50%', backgroundColor: '#32CD32' }]} />
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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