import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../../utils/constantes';

export default function RecuperarClave({ navigation }) {
    const ip = Constantes.IP; // Obtiene la IP del servidor desde las constantes
    // Estados para manejar datos y mostrar la interfaz
    const [alias, setAlias] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Funcion que envia el correo
    const sendMail = async (data) => {
        console.log('Datos recibidos en sendMail:', data);
        try {
            if (!data || !data.correo_cliente) {
                throw new Error('El correo electrónico no está definido');
            }

            console.log('PIN enviado:', data.codigo_recuperacion);

            console.log('Datos a enviar en sendMail:', {
                codigo_recuperacion: data.codigo_recuperacion || '',
                alias_cliente: data.alias_cliente || '',
                correo_cliente: data.correo_cliente || ''
            });

            const formData = new FormData();
            formData.append('codigo_recuperacion', data.codigo_recuperacion || '');
            formData.append('alias_cliente', data.alias_cliente || '');
            formData.append('correo_cliente', data.correo_cliente || '');

            const response = await fetch(`${ip}/libraries/sendCode.php`, {
                method: 'POST',
                body: formData,
            });

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const responseData = await response.json();
                console.log('Respuesta del servidor:', responseData);

                if (responseData.status) {
                    setAlertMessage('Revise su correo electrónico');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                        navigation.navigate('VerificarCodigo', { correoCliente: data.correo_cliente });
                    }, 2000); // Esperar 2 segundos
                } else {
                    setAlertMessage(responseData.message || 'Error al enviar el correo');
                    setShowAlert(true);
                }
            } else {
                const text = await response.text();
                console.error('Respuesta del servidor no es JSON:', text);
                setAlertMessage('Error en la respuesta del servidor');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error en sendMail:', error);
            setAlertMessage(error.toString());
            setShowAlert(true);
        }
    };

    // Funcion para verificar el alias del usuario
    const handleUs = async () => {
        try {
            const formData = new FormData();
            formData.append('aliasCliente', alias);

            const response = await fetch(`${ip}/services/public/cliente.php?action=verifUs`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Datos recibidos:', data);

            if (data.status && data.dataset) {
                const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000).toString();
                const datasetWithCode = {
                    ...data.dataset,
                    codigo_recuperacion: codigoRecuperacion,
                };
                console.log('Datos enviados a sendMail:', datasetWithCode);
                sendMail(datasetWithCode);
            } else {
                setAlertMessage(data.error || 'Error en la respuesta del servidor');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error en handleUs:', error);
            setAlertMessage('Ocurrió un error al iniciar sesión');
            setShowAlert(true);
        }
    };

    
    // Dentro de tu componente RecuperarClave
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setAlias(''); // Borra el alias cuando la pantalla pierde el foco
            };
        }, [])
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../img/atras.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Recuperación de contraseña</Text>
            </View>
            <Text style={styles.registerText}>Ingresa tu alias, posterior te enviaremos un correo al correo enlazado a tu cuenta</Text>
            <TextInput
                style={styles.input}
                placeholder="Alias"
                value={alias}
                onChangeText={(text) => setAlias(text)}
            />
            <TouchableOpacity onPress={handleUs} style={styles.button}>
                <Text style={styles.buttonText}>ENVIAR</Text>
            </TouchableOpacity>

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Alerta"
                message={alertMessage}
                closeOnTouchOutside={true}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 50,
    },
    registerText: {
        justifyContent: 'flex-start'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
    backIcon: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: '#000',
        marginBottom: 24,
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
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
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