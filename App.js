import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus componentes de pantalla aquí
import Login from './src/pantallas/login';
import Registro from './src/pantallas/registro';
import SplashScreen from './src/pantallas/SplashScreen';
import TabNavigator from './src/tabNavigator/tabNavigator';
import Propuesta from './src/pantallas/propuestas';
import cambiarContra from './src/pantallas/cambiarContraseña';
import recuperarContra from './src/pantallas/recuperarContra';
import verificarCodigo from './src/pantallas/verificacion';
import crearPropuesta from './src/pantallas/crearPropuesta';
import Equipo from './src/pantallas/equipos';
import DetalleEquipo from './src/pantallas/DetalleEquipo';
import Home from './src/pantallas/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function inicia() {
      try {
        // Simula una carga inicial
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 segundos
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    inicia();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {appIsReady ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={Registro} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Propuesta" component={Propuesta} />
            <Stack.Screen name="crearPropuesta" component={crearPropuesta} />
            <Stack.Screen name="Equipo" component={Equipo} />
            <Stack.Screen name="cambiarContra" component={cambiarContra} />
            <Stack.Screen name="recuperarContra" component={recuperarContra} />
            <Stack.Screen name="verificarCodigo" component={verificarCodigo} />
            <Stack.Screen name="DetalleEquipo" component={DetalleEquipo} />
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
