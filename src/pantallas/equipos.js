import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TeamCard from '../components/cards/cardEquipos';
import TeamDetailsModal from '../components/modals/detalleEquipo';
import * as Constantes from '../../src/utils/Constantes';

const PropuestasScreen = ({ navigation }) => {
	const [propuestas, setPropuestas] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState(null);
	const ip = Constantes.IP;

	// Función para obtener los equipos asociados al profesor
	const obtenerPropuestas = async () => {
		try {
			const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readEquiposPorProfeSesion`, {
				method: 'POST',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error(`Error HTTP! status: ${response.status}`);
			}

			const data = await response.json();

			if (data.status === 1) {
				setPropuestas(data.dataset); // Guarda las propuestas/equipos obtenidos
			} else {
				console.log("No se pudieron obtener los equipos. Status:", data.status);
			}
		} catch (error) {
			console.error("Error al obtener los equipos:", error);
		}
	};

	// Función para obtener los integrantes de un equipo específico
	const obtenerIntegrantes = async (equipoId) => {
		if (!equipoId) {
			console.error("El ID del equipo es indefinido o nulo");
			return [];
		}

		try {
			const response = await fetch(`${ip}/expo24/api/services/serviceProfesores/profesor.php?action=readIntegrantesPorEquipo`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ equipoId }),  // Enviar el ID del equipo
			});

			const text = await response.text(); // Obtener la respuesta como texto (para depuración)
			console.log("Respuesta del servidor:", text); // Log para verificar la respuesta

			const data = JSON.parse(text); // Parsear el texto a JSON

			if (data.status === 1) {
				return data.dataset; // Devuelve los integrantes si el estado es 1
			} else {
				console.error(data.message); // Si no, muestra el mensaje de error
				return [];
			}

		} catch (error) {
			console.error("Error al obtener los integrantes:", error);
			return [];
		}
	};

	// Función para abrir el modal con detalles del equipo seleccionado
	const openModal = async (teamData) => {
		const integrantes = await obtenerIntegrantes(teamData.equipo); // Obtener los integrantes del equipo
		setSelectedTeam({
			...teamData,
			integrantes, // Añadir los integrantes a los datos del equipo
		});
		setModalVisible(true); // Mostrar el modal
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedTeam(null); // Limpiar el equipo seleccionado
	};

	useEffect(() => {
		obtenerPropuestas(); // Llamar a la función para obtener las propuestas/equipos al cargar el componente
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Equipos PTC</Text>
			<ScrollView style={styles.scrollView}>
				<View style={styles.cardContainer}>

					{propuestas.length > 0 ? (

						propuestas.map((propuesta, index) => (
							<TeamCard

								key={index}

								teamData={{

									equipo: propuesta.equipo,

									coordinador: propuesta.coordinador,

									numero_integrantes: propuesta.numero_integrantes,

								}}

								onPress={() => openModal({

									equipo: propuesta.equipo,

									coordinador: propuesta.coordinador,

									numero_integrantes: propuesta.numero_integrantes,

								})}

							/>

						))

					) : (
						<Text>No hay equipos disponibles</Text>

					)}
				</View>
			</ScrollView>
			<TeamDetailsModal

				visible={modalVisible}

				onClose={closeModal}

				teamData={selectedTeam}

			/>
		</View>

	);

};

const styles = StyleSheet.create({

	container: {

		flex: 1,

		padding: 16,

		backgroundColor: '#fff',

	},

	title: {

		fontSize: 24,

		fontWeight: 'bold',

		marginVertical: 16,

		textAlign: 'center',

	},

	scrollView: {

		flex: 1,

		marginBottom: 16,

	},

	cardContainer: {

		alignItems: 'center',

	},

});

export default PropuestasScreen;