import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Constantes from '../utils/Constantes';

export default function NuevaContraseña({ navigation }) {
    const ip = Constantes.IP; // Obtiene la IP del servidor desde las constantes
    // Función para cargar la lista de vehículos
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Funcion para cambiar la contraseña
    const changePassword = async () => {
        if (newPassword === '' || confirmPassword === '') {
            setAlertMessage('Por favor, complete ambos campos.');
            setShowAlert(true);
            return;
        }

        if (newPassword !== confirmPassword) {
            setAlertMessage('Las contraseñas no coinciden.');
            setShowAlert(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('claveNueva', newPassword);
            formData.append('confirmarClave', confirmPassword);

            const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=changePassword`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status) {
                setAlertMessage('Contraseña actualizada correctamente.');
                setShowAlert(true);
                // Redirige después de 2 segundos
                setTimeout(() => {
                    setShowAlert(false);
                    navigation.navigate('Login');
                }, 2000);
            } else {
                setAlertMessage(data.error);
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Ocurrió un problema al actualizar la contraseña.');
            setShowAlert(true);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Actualizar contraseña</Text>
            </View>
            <Text style={styles.instructions}>Ingresa tu nueva contraseña y confírmala</Text>
            <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={changePassword} style={styles.button}>
                <Text style={styles.buttonText}>GUARDAR</Text>
            </TouchableOpacity>

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Alerta"
                message={alertMessage}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="gray"
                onConfirmPressed={() => setShowAlert(false)}
                contentContainerStyle={styles.alertContentContainer}
                titleStyle={styles.alertTitle}
                messageStyle={styles.alertMessage}
                confirmButtonTextStyle={styles.alertConfirmButtonText}
                confirmButtonStyle={styles.alertConfirmButton}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    instructions: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        marginTop: 10,
        width: '100%',
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10,
        fontSize: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    alertContentContainer: {
        borderRadius: 10,
        padding: 20,
    },
    alertTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 18,
        marginBottom: 10,
    },
    alertConfirmButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    alertConfirmButtonText: {
        fontSize: 16,
    },
});