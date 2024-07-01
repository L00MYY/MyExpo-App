import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus componentes de pantalla aquí
import Login from './src/pantallas/login'
import Registro from './src/pantallas/registro';
import SplashScreen from './src/pantallas/SplashScreen';
import TabNavigator from './src/tabNavigator/tabNavigator';
import Propuesta from './src/pantallas/propuestas'; 
import Equipo from './src/pantallas/equipos'; 
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
            <Stack.Screen name="Registro" component={Registro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </>
        ) : (
          <Stack.Screen namse="SplashScreen" component={SplashScreen} />
        )}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}