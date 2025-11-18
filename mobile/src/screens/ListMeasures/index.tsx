import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	useNavigation,
	useRoute,
	type RouteProp,
} from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import {
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import NavBar from '../../components/NavBar'
import { api } from '../../services/api'
import { Colors } from '../../styles/colors'
import type { DeleteMeasureRequest, MeasureResponse } from '../../types'

type JwtPayload = {
	sub: string
}

type ListMeasuresRouteProp = RouteProp<
	{ ListMeasures: { measures: MeasureResponse[] } },
	'ListMeasures'
>

export default function ListMeasures() {
	const route = useRoute<ListMeasuresRouteProp>()
	const { measures } = route.params
	const navigation = useNavigation<any>()
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [measureToDelete, setMeasureToDelete] =
		useState<MeasureResponse | null>(null)
	const [listMeasures, setListMeasures] = useState<MeasureResponse[]>(measures)

	const openDeleteModal = (measure: MeasureResponse) => {
		setMeasureToDelete(measure)
		setShowDeleteModal(true)
	}

	const closeDeleteModal = () => {
		setShowDeleteModal(false)
		setMeasureToDelete(null)
	}

	const handleConfirmDelete = async () => {
		if (!measureToDelete) return

		try {
			const token = await AsyncStorage.getItem('token')
			if (!token) {
				console.warn('Token não encontrado')
				return
			}
			const decoded = jwtDecode<JwtPayload>(token)
			const email = decoded.sub
			const payload: DeleteMeasureRequest = {
				measureId: measureToDelete.measureId,
				email,
			}

			await api.delete<any>('/measures', {
				data: payload,
				headers: {
					Authorization: token ? `Bearer ${token}` : '',
				},
			})

			setListMeasures((prev) =>
				prev.filter((m) => m.measureId !== measureToDelete.measureId)
			)
			navigation.navigate('Home')
		} catch (error: any) {
			console.log(error?.response?.data || error)
		} finally {
			closeDeleteModal()
		}
	}

	const handleDownloadReport = async () => {
		if (!listMeasures || listMeasures.length === 0) return

		const rows = listMeasures
			.map((m) => {
				const dt = new Date(m.dateCreation)
				const time = dt.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				})
				const date = dt.toLocaleDateString()
				const status =
					m.status === 'NORMAL'
						? 'Normal'
						: m.status === 'LOW'
						? 'Baixo'
						: 'Alto'

				return `
          <tr>
            <td style="padding: 4px 8px; text-align: left;">${m.value} mg/dL</td>
            <td style="padding: 4px 8px; text-align: left;">${time}</td>
            <td style="padding: 4px 8px; text-align: left;">${date}</td>
            <td style="padding: 4px 8px; text-align: left;">${status}</td>
          </tr>
        `
			})
			.join('')

		const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Relatório de Medidas</title>
        </head>
        <body style="font-family: -apple-system, system-ui, sans-serif; padding: 24px;">
          <h1 style="font-size: 20px; margin-bottom: 16px;">Relatório de Medidas</h1>
          <table style="border-collapse: collapse; width: 100%; font-size: 12px;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 4px 8px; border-bottom: 1px solid #ddd;">Valor</th>
                <th style="text-align: left; padding: 4px 8px; border-bottom: 1px solid #ddd;">Hora</th>
                <th style="text-align: left; padding: 4px 8px; border-bottom: 1px solid #ddd;">Data</th>
                <th style="text-align: left; padding: 4px 8px; border-bottom: 1px solid #ddd;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `

		const { uri } = await Print.printToFileAsync({ html })
		await Sharing.shareAsync(uri)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Listagem de Medidas</Text>

			{listMeasures && listMeasures.length > 0 ? (
				<FlatList
					data={listMeasures}
					keyExtractor={(item) => item.measureId}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 96 }}
					renderItem={({ item }) => {
						const dt = new Date(item.dateCreation)
						const time = dt.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})
						const date = dt.toLocaleDateString()
						const unit = 'mg/dL'
						return (
							<Pressable
								style={styles.card}
								onPress={() =>
									navigation.navigate('UpdateMeasure', {
										measureId: item.measureId,
										value: item.value,
										dateCreation: item.dateCreation,
									})
								}
							>
								<View style={styles.headerCard}>
									<View style={styles.measureRow}>
										<Text style={styles.measureValue}>{item.value} </Text>
										<Text style={styles.unitText}>{unit}</Text>
									</View>
									<Pressable onPress={() => openDeleteModal(item)}>
										<Feather
											name={'trash-2'}
											size={24}
											color={Colors.Grey300}
										/>
									</Pressable>
								</View>
								<View style={styles.bottomCard}>
									<View style={styles.dateTimeContainer}>
										<View style={styles.dateTimeText}>
											<Feather
												name={'clock'}
												size={16}
												color={Colors.Grey300}
												style={styles.dateIcon}
											/>
											<Text style={styles.dateText}>{time}</Text>
										</View>
										<View style={styles.dateTimeText}>
											<Feather
												name={'calendar'}
												size={16}
												color={Colors.Grey300}
												style={styles.dateIcon}
											/>
											<Text style={styles.dateText}>{date}</Text>
										</View>
									</View>
									<View
										style={
											item.status === 'NORMAL'
												? styles.normalStatusContainer
												: item.status === 'LOW'
												? styles.lowStatusContainer
												: styles.highStatusContainer
										}
									>
										<Text
											style={
												item.status === 'NORMAL'
													? styles.normalStatusText
													: item.status === 'LOW'
													? styles.lowStatusText
													: styles.highStatusText
											}
										>
											{item.status === 'NORMAL'
												? 'Normal'
												: item.status === 'LOW'
												? 'Baixo'
												: 'Alto'}
										</Text>
									</View>
								</View>
							</Pressable>
						)
					}}
				/>
			) : (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>Não há medições para hoje</Text>
				</View>
			)}
			{showDeleteModal && (
				<Modal
					transparent
					animationType="fade"
					visible={showDeleteModal}
					onRequestClose={closeDeleteModal}
				>
					<View style={styles.modalRoot}>
						<BlurView
							intensity={20}
							tint="dark"
							style={StyleSheet.absoluteFill}
						/>
						<View style={styles.modalCard}>
							<Text style={styles.modalTitle}>Deseja remover a marcação?</Text>

							<View style={styles.modalButtonsRow}>
								<Pressable
									style={[styles.modalButton, styles.modalCancelButton]}
									onPress={closeDeleteModal}
								>
									<Text style={styles.modalCancelText}>Cancelar</Text>
								</Pressable>

								<Pressable
									style={[styles.modalButton, styles.modalConfirmButton]}
									onPress={handleConfirmDelete}
								>
									<Text style={styles.modalConfirmText}>Confirmar</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>
			)}

			{listMeasures && listMeasures.length > 0 && (
				<Pressable style={styles.fab} onPress={handleDownloadReport}>
					<Feather name="download" size={20} color={Colors.White100} />
					<Text style={styles.fabText}>Baixar Relatório</Text>
				</Pressable>
			)}
			<NavBar />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.White100,
		padding: 24,
		gap: 16,
	},

	title: {
		color: Colors.Black900,
		fontSize: 20,
		fontFamily: 'Sora_600SemiBold',
		marginTop: 32,
	},

	icon: {
		position: 'absolute',
		right: 16,
		top: 18,
	},

	card: {
		backgroundColor: Colors.White200,
		borderRadius: 8,
		padding: 16,
		width: 342,
		marginBottom: 12,
		height: 180,
	},

	measureRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},

	measureValue: {
		color: Colors.Black900,
		fontSize: 48,
		fontFamily: 'Sora_800ExtraBold',
	},

	headerCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	dateTimeContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginTop: 16,
	},

	dateTimeText: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 4,
	},

	dateIcon: {
		marginRight: 8,
	},

	dateText: {
		color: Colors.Grey300,
		fontSize: 16,
		fontFamily: 'Sora_400Regular',
	},

	bottomCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 16,
	},

	normalStatusContainer: {
		marginTop: 8,
		backgroundColor: Colors.Green100,
		padding: 4,
		borderRadius: 36,
		width: 120,
		height: 34,
		alignItems: 'center',
		justifyContent: 'center',
	},

	normalStatusText: {
		color: Colors.Green900,
		fontSize: 18,
		fontFamily: 'Sora_400Regular',
	},

	lowStatusContainer: {
		marginTop: 8,
		backgroundColor: Colors.Blue100,
		padding: 4,
		borderRadius: 36,
		width: 120,
		height: 34,
		alignItems: 'center',
		justifyContent: 'center',
	},

	lowStatusText: {
		color: Colors.Blue900,
		fontSize: 18,
		fontFamily: 'Sora_400Regular',
	},

	highStatusContainer: {
		marginTop: 8,
		backgroundColor: Colors.Red100,
		padding: 4,
		borderRadius: 36,
		width: 120,
		height: 34,
		alignItems: 'center',
		justifyContent: 'center',
	},

	highStatusText: {
		color: Colors.Red900,
		fontSize: 18,
		fontFamily: 'Sora_400Regular',
	},
	emptyContainer: {
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyText: {
		color: Colors.Grey300,
		fontSize: 16,
		fontFamily: 'Sora_400Regular',
	},
	unitText: {
		color: Colors.Black900,
		fontSize: 18,
		fontFamily: 'Sora_400Regular',
	},
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
		backgroundColor: Colors.Red100,
	},

	modalConfirmButton: {
		backgroundColor: Colors.Green100,
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

	fab: {
		position: 'absolute',
		bottom: 80, // ajusta se o NavBar ocupar mais/menos espaço
		alignSelf: 'center',
		backgroundColor: Colors.Blue100,
		borderRadius: 999,
		paddingHorizontal: 24,
		height: 48,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 2 },
		elevation: 4,
	},

	fabText: {
		color: Colors.White100,
		fontFamily: 'Sora_600SemiBold',
		fontSize: 14,
		marginLeft: 8,
	},
})
