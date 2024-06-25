import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function SignUp({ navigation }) {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    return (
        <View style={styles.container}>
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
            <Button title="Registrar" onPress={() => { }} color="#1E90FF" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        justifyContent: 'center',
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
});