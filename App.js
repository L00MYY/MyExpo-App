import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importa tus componentes de pantalla aquí
import Login from './src/pantallas/login';
import Registro from './src/pantallas/registro';
import SplashScreen from './src/pantallas/SplashScreen';
import Propuesta from './src/pantallas/propuestas';
import CambiarContra from './src/pantallas/cambiarContraseña';
import RecuperarContra from './src/pantallas/recuperarContra';
import VerificarCodigo from './src/pantallas/verificacion';
import CrearPropuesta from './src/pantallas/crearPropuesta';
import Equipo from './src/pantallas/equipos';
import DetalleEquipo from './src/pantallas/DetalleEquipo';
import Home from './src/pantallas/Home';
import TabNavigator from './src/tabNavigator/tabNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
            headerShown: false, // Oculta los encabezados de las pantallas 
          }}>
          {appIsReady ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registro" component={Registro} />
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="CrearPropuesta" component={CrearPropuesta} />
              <Stack.Screen name="CambiarContra" component={CambiarContra} />
              <Stack.Screen name="RecuperarContra" component={RecuperarContra} />
              <Stack.Screen name="VerificarCodigo" component={VerificarCodigo} />
              <Stack.Screen name="DetalleEquipo" component={DetalleEquipo} />
            </>
          ) : (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
