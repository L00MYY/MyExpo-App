import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AwesomeAlert from 'react-n-awesome-alerts';
import * as Constantes from '../../src/utils/Constantes';
 
// Componente principal de registro.
export default function Registro({ navigation }) {
    // Obtención de la IP del servidor desde el archivo de constantes.
    const ip = Constantes.IP;
 
    // Estados para almacenar los datos del formulario.
    const [nombre, setNombre] = useState('');
    const [carnet, setCarnet] = useState('');
    const [email, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [showAlert, setShowAlert] = useState(false); // Estado para manejar la visibilidad de la alerta.
    const [alertMessage, setAlertMessage] = useState(''); // Estado para manejar el mensaje de la alerta.
    const [isRegistering, setIsRegistering] = useState(false); // Estado para indicar si se está registrando.
 
    // Expresión regular para validar el formato del teléfono (####-####).
    const telefonoRegex = /^\d{4}-\d{4}$/;
 
    // Función para manejar el cambio de texto en el campo de teléfono.
    const handleTextChange = (text) => {
        let formatted = text.replace(/[^\d]/g, ''); // Elimina todos los caracteres no numéricos.
        if (formatted.length > 8) {
            formatted = formatted.slice(0, 8); // Limita a 8 dígitos.
        }
        if (formatted.length > 4) {
            formatted = formatted.slice(0, 4) + '-' + formatted.slice(4);
        }
        setTelefono(formatted); // Actualiza el estado con el valor formateado.
    };
 
    // Función para mostrar una alerta con un mensaje específico.
    const showAlertWithMessage = (message) => {
        setAlertMessage(message);  // Establece el mensaje de la alerta.
        setShowAlert(true); // Muestra la alerta.
    };
 
    // Función asíncrona para manejar la creación de una cuenta.
    const handleCreate = async () => {
        // Validaciones de los campos del formulario.
        if (!nombre.trim() || !direccion.trim() || !telefono.trim() ||
            !email.trim() || !clave.trim() || !confirmarClave.trim()) {
            showAlertWithMessage("Debes llenar todos los campos");
            return;
        } else if (!telefonoRegex.test(telefono)) {
            showAlertWithMessage("El teléfono debe tener el formato correcto (####-####)");
            return;
        }
 
        setIsRegistering(true);
 
        try {
            // Creación de un objeto FormData para enviar los datos del formulario.
            const formData = new FormData();
            formData.append('nombreProfesor', nombre);
            formData.append('carnetProfesor', carnet);
            formData.append('correoProfesor', email);
            formData.append('claveProfesor', clave);
            formData.append('confirmarClave', confirmarClave);
            // Envío de los datos del formulario al servidor.
            const response = await fetch(`${ip}/services/public/profesorService.php?action=   `, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status) {
                Alert.alert('Cuenta registrada correctamente');
                setTimeout(() => {
                    navigation.navigate('Login'); // Redirección a la pantalla de inicio de sesión después de 2 segundos.
                }, 2000);
            } else {
                showAlertWithMessage(data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un problema al registrar la cuenta');
        } finally {
            setIsRegistering(false); // Indica que se ha terminado el registro.
        }
    };
 
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Registra tu cuenta para ver nuestros productos</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="carnet"
                value={direccion}
                onChangeText={setCarnet}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setCorreo}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Escribe una contraseña"
                value={clave}
                onChangeText={setClave}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirma tu contraseña"
                value={confirmarClave}
                onChangeText={setConfirmarClave}
                secureTextEntry
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
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 50,
    },
    title: {
        fontSize: 32,
    },
    subtitle: {
        fontSize: 18,
        color: '#000',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10,
        fontSize: 16,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    alertContentContainer: {
        // Puedes ajustar el estilo según sea necesario
    },
    alertTitle: {
        // Puedes ajustar el estilo según sea necesario
    },
    alertMessage: {
        // Puedes ajustar el estilo según sea necesario
    },
    alertConfirmButton: {
        // Puedes ajustar el estilo según sea necesario
    },
    alertConfirmButtonText: {
        // Puedes ajustar el estilo según sea necesario
    }
});