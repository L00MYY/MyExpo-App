import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importa tus componentes de pantalla aquí
import Home from '../pantallas/Home';
import Propuesta from '../pantallas/propuestas';
import Equipo from '../pantallas/equipos';
import Perfil from '../pantallas/Perfil';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#000', // Color de los íconos activos
        tabBarInactiveTintColor: '#000', // Color de los íconos inactivos
        tabBarStyle: { backgroundColor: '#fff', height: 60, borderTopWidth: 0 }, // Estilo de la barra de pestañas
        tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Propuesta') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Equipos') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Propuesta"
        component={Propuesta}
        options={{ title: 'Propuesta' }}
      />
      <Tab.Screen
        name="Equipos"
        component={Equipo}
        options={{ title: 'Equipos' }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;