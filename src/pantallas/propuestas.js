import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import ProposalCard from '../components/cards/cardEquipos'; // Asegúrate de que esta ruta sea correcta
import * as Constantes from '../../src/utils/Constantes';

const PropuestasScreen = ({ navigation }) => {
    const ip = Constantes.IP;

    const [propuestas, setPropuestas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener las propuestas
    const fetchPropuestas = async () => {
        try {
            const response = await fetch(`${ip}/expo24/api/services/servicePropuestas/propuesta.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setPropuestas(data.propuestas); // Asegúrate de que esta sea la estructura correcta
            } else {
                Alert.alert('Error', 'No se pudieron cargar las propuestas');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al cargar las propuestas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPropuestas();
    }, []);

    const renderItem = ({ item }) => (
        <ProposalCard
            proposalData={item}
            onPress={() => handleViewMore(item)}
        />
    );

    const handleViewMore = (proposal) => {
        // Manejar la navegación o mostrar detalles
        console.log('Detalles de la propuesta:', proposal);
        navigation.navigate('ProposalDetail', { proposal }); // Cambia 'ProposalDetail' según tu configuración
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando propuestas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={propuestas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_propuesta.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
    },
});

export default PropuestasScreen;