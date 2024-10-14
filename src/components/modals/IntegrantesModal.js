// IntegrantesModal.js
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const IntegrantesModal = ({ visible, onClose, integrantes }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Integrantes del Equipo</Text>
                    <FlatList
                        data={integrantes}
                        keyExtractor={(item) => item.id_alumno.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.integranteItem}>
                                <Text>{item.nombre_completo}</Text>
                                <Text>{item.carnet}</Text>
                                <Text>{item.nivel_academico}</Text>
                                <Text>{item.curso}</Text>
                                <Text>{item.rol}</Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
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
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    integranteItem: {
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default IntegrantesModal;