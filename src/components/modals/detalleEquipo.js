import React from 'react';
import { View, Text, Modal, Button, StyleSheet, FlatList } from 'react-native';

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
              <Text>{`Número de integrantes: ${teamData.members_count}`}</Text>

              {/* Mostrar lista de integrantes */}
              {teamData.integrantes && teamData.integrantes.length > 0 ? (
                <>
                  <Text style={styles.subtitle}>Integrantes:</Text>
                  <FlatList
                    data={teamData.integrantes}
                    keyExtractor={(item) => item.id_alumno.toString()} // Cambia a un ID único si lo tienes
                    renderItem={({ item }) => (
                      <Text style={styles.memberText}>{item.nombre_alumno}</Text>
                    )}
                  />
                </>
              ) : (
                <Text>No hay integrantes disponibles</Text>
              )}
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
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  memberText: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default TeamDetailsModal;
