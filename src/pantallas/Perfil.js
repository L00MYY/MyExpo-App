import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import * as Constantes from "../utils/Constantes";

export default function Perfil({ navigation }) {
  const ip = Constantes.IP; // Obtiene la IP del servidor desde las constantes

  // Encabezado del componente
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>
      ),
      headerTitleAlign: "left",
    });
  }, [navigation]);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");

  const showAlert = (title, message, type) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const [profileData, setProfileData] = useState({
    nombre_profesor: "",
    carnet_profesor: "",
    correo_profesor: "",
  });

  // Funcion para leer la informacion
  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readProfile`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.status) {
        setProfileData(data.dataset);
      } else {
        showAlert("Error", "No se pudo obtener los datos del perfil", "error");
        console.log(data);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      showAlert(
        "Error",
        "Ocurrió un error al obtener los datos del perfil",
        "error"
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProfileData();
    }, [])
  );

  // Funcion para cerrar sesion de boton
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${ip}/expo24/api/services/serviceProfesores/profesor.php?action=logOut`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.status) {
        showAlert("Éxito", "Has cerrado sesión exitosamente.", "success");
        setTimeout(() => {
          hideAlert();
          navigation.navigate("Login");
        }, 2000);
      } else {
        showAlert("Error", "Error al cerrar sesión.", "error");
      }
    } catch (error) {
      showAlert("Error de red", "Ocurrió un error de red.", "error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tu nombre:</Text>
      <Text style={styles.data}>{profileData.nombre_profesor}</Text>

      <Text style={styles.label}>Código:</Text>
      <Text style={styles.data}>{profileData.carnet_profesor}</Text>

      <Text style={styles.label}>Correo electrónico:</Text>
      <Text style={styles.data}>{profileData.correo_profesor}</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Icon name="logout" type="material" color="#fff" />
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={alertVisible}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={!alertType.includes("progress")}
        closeOnHardwareBackPress={!alertType.includes("progress")}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="gray"
        onConfirmPressed={hideAlert}
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
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  data: {
    fontSize: 16,
    marginBottom: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  alertContentContainer: {
    borderRadius: 10,
    padding: 20,
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: "bold",
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
