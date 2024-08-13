import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Constantes from '../../src/utils/Constantes';
import { useFocusEffect } from '@react-navigation/native';

export default function Login({ navigation }) {
    const ip = Constantes.IP;

    // Estados
    const [correo, setCorreo] = useState(''); // Estado para el campo del usuario
    const [clave, setClave] = useState(''); // Estado para el campo de la clave
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
    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 1) {
                navigation.navigate('TabNavigator');
                console.log("Se ingresa con la sesión activa")
            } else {
                console.log("No hay sesión activa")
                return
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    }

    // Función para cerrar la sesión activa
    const cerrarSesion = async () => {
        try {
            const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=logOut`, {
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
        if (!correo.trim() || !clave.trim()) {
            showAlertWithMessage('Por favor completa todos los campos'); // Verifica que los campos no estén vacíos
            return;
        }

        showAlertWithMessage('Iniciando sesión...', true); // Muestra un mensaje de progreso

        try {
            const formData = new FormData();
            formData.append('correoProfesor', correo);
            formData.append('claveProfesor', clave);

            const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=logIn`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                setClave('');
                setCorreo('');
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
    const irRegistrar = () => {
        navigation.navigate('Registro');
    };

    // Efecto para validar la sesión al montar el componente
    useEffect(() => {
        validarSesion();
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../img/logo-ricaldone.png')}
                style={styles.logo}
            />
            <TextInput
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#fff"
                keyboardType="email-address"
            />
            <TextInput
                value={clave}
                onChangeText={setClave}
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                placeholderTextColor="#fff"
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
        backgroundColor: '#000',
    },
    headerText: {
        height: 16,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1, // Asegura que el contenido se expanda para ajustarse al ScrollView
    },
    input: {
        height: 50,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#fff'
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    registerText: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    loginButton: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    loginButtonText: {
        color: '#000',
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
    logo: {
        width: 270,
        height: 50,
        alignSelf: 'center',
        marginBottom: 80,
    },
});
