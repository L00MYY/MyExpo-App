import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importa tus componentes de pantalla aquí
import Home from '../pantallas/Home';
import Equipo from '../pantallas/equipos'; 
import Propuesta from '../pantallas/propuestas';// Ejemplo de otra pantalla

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#A8E910', // Color de los íconos activos
        tabBarInactiveTintColor: '#fff', // Color de los íconos inactivos
        tabBarStyle: { backgroundColor: '#081F49', height: 60, borderTopWidth: 0 }, // Estilo de la barra de pestañas
        tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Equipo') {
            iconName = focused ? 'list' : 'list-outline';
          }else if (route.name === 'Propuesta') {
            iconName = focused ? 'list' : 'list-outline';
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarLabel: () => null, // Esta línea elimina el texto debajo de los iconos
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Equipo"
        component={Equipo}
      />
      <Tab.Screen
        name="Propuesta"
        component={Propuesta}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;