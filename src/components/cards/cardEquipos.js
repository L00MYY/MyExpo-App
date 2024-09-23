import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TeamCard = ({ teamData }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://img.icons8.com/ios/452/task.png' }} 
          style={styles.icon} 
        />
        <Text style={styles.title}>
          {`Equipo: ${teamData.team_name}, Coordinador: ${teamData.coordinator_name}`}
        </Text>
      </View>
      <Text style={styles.subtitle}>{`Integrantes: ${teamData.members_count}`}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>VER MÁS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: 300,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TeamCard;
