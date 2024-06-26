import React, { useState } from 'react';
import { View, Image, Text, TextInput, Button, StyleSheet } from 'react-native';
import imagenLogo from '../img/logo-ricaldone.png';

export default function Login({ navigation }) {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.conteImg}><Image source={imagenLogo} style={styles.image} /></View>
            <View style={styles.contentView}>
                <Text style={styles.title}>Inicio de Secion</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={setCorreo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={contrasena}
                    onChangeText={setContrasena}
                />
                <Button on title="Registrar" onPress={() => navigation.navigate('TabNavigator')}
                    color="#1E90FF" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    conteImg: {
        marginTop: -250,
        width: 350,  // Ancho deseado de la imagen
        height: 350, // Alto deseado de la imagen
        resizeMode: 'contain', // Ajusta el tamaño de la imagen para que encaje dentro de su contenedor
        justifyContent: 'flex-start', // Alinea los elementos hacia arriba
        alignItems: 'center', // Centra horizontalmente
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#1E1E1E',
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 15,
    },
    contentView: {
        position: 'absolute',
        top: '40%',
        width: '100%',
        marginHorizontal: 20
    }
});