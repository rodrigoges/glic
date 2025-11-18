import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/colors'

export default function NavBar() {
	const navigation = useNavigation<any>()
	const route = useRoute<any>()
	const current = route.name

	const [showLogoutModal, setShowLogoutModal] = useState(false)

	const items = [
		{ key: 'Home', label: 'Início', icon: 'home' },
		{ key: 'AddMeasure', label: 'Adicionar', icon: 'plus-circle' },
		{ key: 'Search', label: 'Pesquisar', icon: 'search' },
		{ key: 'Logout', label: 'Sair', icon: 'log-out' },
	]

	const handleLogout = async () => {
		await AsyncStorage.removeItem('token')
		setShowLogoutModal(false)
		navigation.reset({
			index: 0,
			routes: [{ name: 'Login' }],
		})
	}

	return (
		<>
			<View style={styles.navbarContainer}>
				{items.map((it) => {
					const isActive = current === it.key
					return (
						<Pressable
							key={it.key}
							style={[
								styles.navBarItemContainer,
								isActive ? styles.navBarItemActive : styles.navBarItemInactive,
							]}
							onPress={() => {
								if (it.key === 'Logout') {
									setShowLogoutModal(true)
								} else {
									navigation.navigate(it.key)
								}
							}}
						>
							<Feather
								name={it.icon as any}
								size={16}
								color={isActive ? Colors.White100 : Colors.Grey300}
							/>
							<Text
								style={
									isActive
										? styles.navBarItemTextActive
										: styles.navBarItemTextInactive
								}
							>
								{it.label}
							</Text>
						</Pressable>
					)
				})}
			</View>

			{/* Modal de confirmação de logout */}
			<Modal
				transparent
				visible={showLogoutModal}
				animationType="fade"
				onRequestClose={() => setShowLogoutModal(false)}
			>
				<View style={styles.modalRoot}>
					<View style={styles.modalOverlay}>
						<View style={styles.modalCard}>
							<Text style={styles.modalTitle}>Deseja realmente sair?</Text>

							<View style={styles.modalButtonsRow}>
								<Pressable
									style={[styles.modalButton, styles.modalCancelButton]}
									onPress={() => setShowLogoutModal(false)}
								>
									<Text style={styles.modalCancelText}>Cancelar</Text>
								</Pressable>

								<Pressable
									style={[styles.modalButton, styles.modalConfirmButton]}
									onPress={handleLogout}
								>
									<Text style={styles.modalConfirmText}>Confirmar</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</>
	)
}

const styles = StyleSheet.create({
	navbarContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 8,
		height: 72,
		backgroundColor: Colors.White100,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingHorizontal: 24,
	},

	navBarItemContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		padding: 6,
		borderRadius: 36,
	},

	navBarItemActive: {
		backgroundColor: Colors.Blue100,
	},

	navBarItemInactive: {
		backgroundColor: Colors.White100,
	},

	navBarItemTextActive: {
		color: Colors.White100,
		fontFamily: 'Sora_600SemiBold',
		marginLeft: 4,
	},

	navBarItemTextInactive: {
		color: Colors.Grey300,
		fontFamily: 'Sora_400Regular',
		marginLeft: 4,
	},

	/* --- estilos da modal de logout --- */
	modalRoot: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	modalCard: {
		width: '80%',
		backgroundColor: Colors.White100,
		borderRadius: 16,
		paddingVertical: 24,
		paddingHorizontal: 16,
		alignItems: 'center',
	},

	modalTitle: {
		fontFamily: 'Sora_600SemiBold',
		fontSize: 16,
		color: Colors.Black900,
		textAlign: 'center',
		marginBottom: 20,
	},

	modalButtonsRow: {
		flexDirection: 'row',
		columnGap: 12,
	},

	modalButton: {
		flex: 1,
		height: 40,
		borderRadius: 999,
		alignItems: 'center',
		justifyContent: 'center',
	},

	modalCancelButton: {
		backgroundColor: '#EF4444', // vermelho
	},

	modalConfirmButton: {
		backgroundColor: '#22C55E', // verde
	},

	modalCancelText: {
		color: Colors.White100,
		fontFamily: 'Sora_600SemiBold',
		fontSize: 14,
	},

	modalConfirmText: {
		color: Colors.White100,
		fontFamily: 'Sora_600SemiBold',
		fontSize: 14,
	},

	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.25)', // fundo escuro translúcido
		justifyContent: 'center',
		alignItems: 'center',
	},
})
