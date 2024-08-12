// Importaciones
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Constantes from '../../src/utils/Constantes';
import { useFocusEffect } from '@react-navigation/native';

// Componente principal
export default function Login({ navigation }) {
    const ip = Constantes.IP;
 
    // Estados
    const [isContra, setIsContra] = useState(true);  // Estado para mostrar/ocultar la contraseña
    const [usuario, setUsuario] = useState(''); // Estado para el campo del usuario
    const [contrasenia, setContrasenia] = useState(''); // Estado para el campo de la contraseña
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar/ocultar la alerta
    const [alertMessage, setAlertMessage] = useState(''); // Estado para el mensaje de la alerta
    const [showProgress, setShowProgress] = useState(false); // Estado para mostrar/ocultar el indicador de progreso
 
    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            validarSesion(); // Llama a la función getDetalleCarrito.
        }, [])
    );
 
    // Función para validar si hay una sesión activa
    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/services/public/profesorService.php?action=getUser`, {
                method: 'GET'
            });
 
            const data = await response.json();
 
            if (data.status === 1) {
                navigation.navigate('TabNavigator'); // Navega a la siguiente pantalla
            } else {
                console.log("No hay sesión activa");
            }
        } catch (error) {
            console.error(error);
            showAlertWithMessage('Ocurrió un error al validar la sesión'); // Muestra un mensaje de error
        }
    };
 
    // Función para cerrar la sesión activa
    const cerrarSesion = async () => {
        try {
            const response = await fetch(`${ip}/services/public/profesorService.php?action=logOut`, {
                method: 'GET'
            });
 
            const data = await response.json();
 
            if (data.status) {
                console.log("Sesión Finalizada");
            } else {
                console.log('No se pudo eliminar la sesión');
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            showAlertWithMessage('Ocurrió un error al cerrar sesión'); // Muestra un mensaje de error
        }
    };
 
    // Función para mostrar una alerta con un mensaje específico
    const showAlertWithMessage = (message, showProgressIndicator = false) => {
        setAlertMessage(message);
        setShowProgress(showProgressIndicator);
        setShowAlert(true);
    };
 
    // Función para manejar el proceso de inicio de sesión
    const handlerLogin = async () => {
        if (!usuario.trim() || !contrasenia.trim()) {
            showAlertWithMessage('Por favor completa todos los campos'); // Verifica que los campos no estén vacíos
            return;
        }
 
        showAlertWithMessage('Iniciando sesión...', true); // Muestra un mensaje de progreso
 
        try {
            const formData = new FormData();
            formData.append('correo', usuario);
            formData.append('clave', contrasenia);
 
            const response = await fetch(`${ip}/services/public/profesorService.php?action=logIn`, {
                method: 'POST',
                body: formData
            });
 
            const data = await response.json();
 
            if (data.status) {
                setContrasenia('');
                setUsuario('');
                showAlertWithMessage('¡Bienvenido!'); // Muestra un mensaje de bienvenida
                setTimeout(() => {
                    navigation.navigate('TabNavigator'); // Navega a la siguiente pantalla
                    setShowAlert(false);
                }, 2000);
            } else {
                console.log(data);
                showAlertWithMessage(data.error); // Muestra un mensaje de error
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            showAlertWithMessage('Ocurrió un error al iniciar sesión');  // Muestra un mensaje de error
        } finally {
            setShowProgress(false); // Oculta el indicador de progreso
        }
    };
 
    // Función para navegar a la pantalla de registro
    const irRegistrar = async () => {
        navigation.navigate('Registro');
    };
 
    // Efecto para validar la sesión al montar el componente
    useEffect(() => {
        validarSesion();
    }, []);
 
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Iniciar Sesión</Text>
            <TextInput
                value={usuario}
                onChangeText={setUsuario}
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
            />
            <TextInput
                value={contrasenia}
                onChangeText={setContrasenia}
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                placeholderTextColor="#aaa"
            />
            <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={irRegistrar}>
                <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
            <AwesomeAlert
                show={showAlert}
                showProgress={showProgress}
                title="Alerta"
                message={alertMessage}
                closeOnTouchOutside={!showProgress}
                closeOnHardwareBackPress={!showProgress}
                showCancelButton={false}
                showConfirmButton={!showProgress}
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
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
    },
    input: {
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
        color: '#000',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#000',
        marginBottom: 15,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    registerText: {
        fontSize: 14,
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    loginButton: {
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    loginButtonText: {
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