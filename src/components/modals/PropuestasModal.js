import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const PropuestasModal = ({ visible, onClose, propuestas }) => {
    console.log("Propuestas recibidas por el modal:", propuestas); // Verifica qué propuestas se están pasando al modal
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Propuestas del Equipo</Text>

                    {/* Encabezados de la tabla */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>Nombre Propuesta</Text>
                        <Text style={styles.headerText}>Descripción</Text>
                        <Text style={styles.headerText}>Estado</Text>
                        <Text style={styles.headerText}>Tipo</Text>
                    </View>

                    {/* Lista de propuestas */}
                    <FlatList
                        data={propuestas}
                        keyExtractor={(item) => item.id_propuesta.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.propuestaItem}>
                                <Text style={styles.itemText}>{item.nombre_propuesta}</Text>
                                <Text style={styles.itemText}>{item.descripcion_propuesta}</Text>
                                <Text style={styles.itemText}>{item.estado_propuesta}</Text>
                                <Text style={styles.itemText}>{item.tipo_propuesta}</Text>
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
        width: '90%',
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
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        marginBottom: 10,
    },
    headerText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    propuestaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    itemText: {
        flex: 1,
        textAlign: 'center',
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
