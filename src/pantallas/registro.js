import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Constantes from '../../src/utils/Constantes';

export default function Registro({ navigation }) {
    const ip = Constantes.IP;

    // Estados para almacenar los datos del formulario.
    const [nombre, setNombre] = useState('');
    const [carnet, setCarnet] = useState('');
    const [email, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(''); 
    const [isRegistering, setIsRegistering] = useState(false); 

    // Función para mostrar una alerta con un mensaje específico.
    const showAlertWithMessage = (message) => {
        setAlertMessage(message);  
        setShowAlert(true); 
    };

    // Función asíncrona para manejar la creación de una cuenta.
    const handleCreate = async () => {
        if (!nombre.trim() || !carnet.trim() || !email.trim() || !clave.trim() || !confirmarClave.trim()) {
            showAlertWithMessage("Debes llenar todos los campos");
            return;
        }

        if (clave !== confirmarClave) {
            showAlertWithMessage("Las contraseñas no coinciden");
            return;
        }

        setIsRegistering(true);

        try {
            const formData = new FormData();
            formData.append('nombreProfesor', nombre);
            formData.append('carnetProfesor', carnet);
            formData.append('correoProfesor', email);
            formData.append('claveProfesor', clave);
            formData.append('confirmarClave', confirmarClave);
            console.log(formData);

            const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=signUp`, {
                method: 'POST',
                body: formData
            });
            
            //console.log(response);
            const data = await response.json();
            console.log(data);
            if (data.status) {
                Alert.alert('Cuenta registrada correctamente.');
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 2000);
            } else {  
                showAlertWithMessage(data.error || 'Ocurrió un problema al registrar la cuenta.');
            }
        } catch (error) {
            Alert.alert('Ocurrió un problema al registrar la cuenta.');
        } finally {
            setIsRegistering(false); 
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
             <Image
                    source={require('../img/logo-ricaldone.png')}
                    style={styles.logo}
                />
            <Text style={styles.subtitle}>Registra tu cuenta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                placeholderTextColor='#FFF'
            />
            <TextInput
                style={styles.input}
                placeholder="Carnet"
                value={carnet}
                onChangeText={setCarnet}
                placeholderTextColor='#FFF'
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setCorreo}
                keyboardType="email-address"
                placeholderTextColor='#FFF'
            />
            <TextInput
                style={styles.input}
                placeholder="Escribe una contraseña"
                value={clave}
                onChangeText={setClave}
                secureTextEntry
                placeholderTextColor='#FFF'
            />
            <TextInput
                style={styles.input}
                placeholder="Confirma tu contraseña"
                value={confirmarClave}
                onChangeText={setConfirmarClave}
                secureTextEntry
                placeholderTextColor='#FFF'
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCreate}>
                    <Text style={styles.buttonText}>REGISTRARSE</Text>
                </TouchableOpacity>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={isRegistering}
                    title={isRegistering ? "Registrando" : "Mensaje"}
                    message={alertMessage}
                    closeOnTouchOutside={!isRegistering}
                    closeOnHardwareBackPress={!isRegistering}
                    showCancelButton={false}
                    showConfirmButton={!isRegistering}
                    confirmText="OK"
                    confirmButtonColor="gray"
                    onConfirmPressed={() => {
                        setShowAlert(false);
                    }}
                    contentContainerStyle={styles.alertContentContainer}
                    titleStyle={styles.alertTitle}
                    messageStyle={styles.alertMessage}
                    confirmButtonStyle={styles.alertConfirmButton}
                    confirmButtonTextStyle={styles.alertConfirmButtonText}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 50,
    },
    scrollViewContent: {
        flexGrow: 1, // Asegura que el contenido se expanda para ajustarse al ScrollView
    }, 
    title: {
        fontSize: 32,
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10,
        fontSize: 16,
        color: '#fff'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logo: {
        width: 270,
        height: 50,
        alignSelf: 'center',
    },
    alertContentContainer: {

    },
    alertTitle: {

    },
    alertMessage: {

    },
    alertConfirmButton: {

    },
    alertConfirmButtonText: {

    }
});