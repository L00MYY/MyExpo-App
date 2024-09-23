import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
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

  // Funcion para cerrar sesion
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${ip}/services/public/cliente.php?action=logOut`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.status) {
        showAlert("Éxito", "Has cerrado sesión exitosamente.", "success");
        setTimeout(() => {
          hideAlert();
          navigation.navigate("Sesion");
        }, 2000);
      } else {
        showAlert("Error", "Error al cerrar sesión.", "error");
      }
    } catch (error) {
      showAlert("Error de red", "Ocurrió un error de red.", "error");
    }
  };

  const handleTextChange = (text) => {
    let formatted = text.replace(/[^\d]/g, ""); // Elimina todos los caracteres no numéricos.
    if (formatted.length > 8) {
      formatted = formatted.slice(0, 8); // Limita a 8 dígitos.
    }
    if (formatted.length > 4) {
      formatted = formatted.slice(0, 4) + "-" + formatted.slice(4); // Formatea como XXXX-XXXX.
    }
    setProfileData((prevData) => ({
      ...prevData,
      contacto_cliente: formatted,
    })); // Actualiza el estado con el valor formateado.
  };

  const irCambiarContraseña = () => {
    navigation.navigate("Contrasenia");
  };

  // Funcion para cambiar los datos
  const editProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("nombreProfesor", profileData.nombre_profesor);
      formData.append("carnetProfesor", profileData.carnet_profesor);
      formData.append("correoProfesor", profileData.correo_profesor);

      const response = await fetch(
        `${ip}/expo24/api/services/serviceProfesores/profesor.php?action=editProfile`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status) {
        showAlert("Éxito", data.message, "success");
      } else {
        showAlert("Error", data.error, "error");
      }
    } catch (error) {
      console.error("Error :", error);
      showAlert("Error", "Error al editar", "error");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del profesor"
        value={profileData.nombre_profesor}
        onChangeText={(text) =>
          setProfileData((prevData) => ({ ...prevData, nombre_profesor: text }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Carnet"
        value={profileData.carnet_profesor}
        onChangeText={(text) =>
          setProfileData((prevData) => ({ ...prevData, carnet_profesor: text }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={profileData.correo_profesor}
        onChangeText={(text) =>
          setProfileData((prevData) => ({ ...prevData, correo_profesor: text }))
        }
      />
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" type="material" color="#000" />
        </TouchableOpacity>
      <TouchableOpacity onPress={editProfile} style={styles.button}>
        <Text style={styles.buttonText}>GUARDAR PERFIL</Text>
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
  title: {
    fontSize: 30,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  input: {
    backgroundColor: "white", // Fondo gris claro similar al botón
    width: "100%",
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 8, // Bordes redondeados para el input
  },
  button: {
    backgroundColor: "#000", // Fondo negro similar al input
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
    borderRadius: 8, // Bordes redondeados para el botón
  },
  button2: {
    backgroundColor: "#FEAF00", // Fondo negro similar al input
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
    borderRadius: 8, // Bordes redondeados para el botón
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },
  logoutText: {
    fontSize: 16,
    marginRight: 8,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
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
