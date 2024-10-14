// components/modals/detalleEquipo.js
import React from 'react';
import { Modal, View, Text, StyleSheet, Button, FlatList } from 'react-native';

const TeamDetailsModal = ({ visible, onClose, teamData }) => {
    if (!teamData) return null; // Si no hay datos, no muestra nada

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{teamData.nombre_equipo}</Text>
                    <Text style={styles.modalSubtitle}>Integrantes:</Text>

                    <FlatList
                        data={teamData.integrantes}
                        keyExtractor={(item) => item.identificadorDetalleEqui.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.integranteContainer}>
                                <Text style={styles.integranteNombre}>{item.nombre_completo}</Text>
                                <Text style={styles.integranteDetalle}>
                                    {item.carnet} - {item.nivel_academico} - {item.curso} - {item.rol}
                                </Text>
                            </View>
                        )}
                    />

                    <Button title="Cerrar" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    integranteContainer: {
        marginBottom: 5,
    },
    integranteNombre: {
        fontWeight: 'bold',
    },
    integranteDetalle: {
        fontSize: 12,
        color: 'gray',
    },
});

export default TeamDetailsModal;
