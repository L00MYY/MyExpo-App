import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

const TeamDetailsModal = ({ visible, onClose, teamData }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {teamData ? (
            <>
              <Text style={styles.title}>{`Detalles del Equipo: ${teamData.team_name}`}</Text>
              <Text>{`Coordinador: ${teamData.coordinator_name}`}</Text>
              <Text>{`Integrantes: ${teamData.members_count}`}</Text>
            </>
          ) : (
            <Text>No hay datos disponibles</Text>
          )}
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TeamDetailsModal;