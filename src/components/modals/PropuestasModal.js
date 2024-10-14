// PropuestasModal.js
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const PropuestasModal = ({ visible, onClose, propuestas }) => {
    console.log("Propuestas recibidas por el modal:", propuestas); // Verifica qué propuestas se están pasando al modal
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Propuestas del Equipo</Text>
                    <FlatList
                        data={propuestas}
                        keyExtractor={(item) => item.id_propuesta.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.propuestaItem}>
                                <Text>{item.nombre_propuesta}</Text>
                                <Text>{item.descripcion_propuesta}</Text>
                                <Text>{item.estado_propuesta}</Text>
                                <Text>{item.tipo_propuesta}</Text>
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
    propuestaItem: {
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

export default PropuestasModal;