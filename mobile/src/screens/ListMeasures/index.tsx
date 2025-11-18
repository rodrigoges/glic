import { Feather } from '@expo/vector-icons'
import {
	useNavigation,
	useRoute,
	type RouteProp,
} from '@react-navigation/native'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import NavBar from '../../components/NavBar'
import { Colors } from '../../styles/colors'
import type { MeasureResponse } from '../../types'

type ListMeasuresRouteProp = RouteProp<
	{ ListMeasures: { measures: MeasureResponse[] } },
	'ListMeasures'
>

export default function ListMeasures() {
	const route = useRoute<ListMeasuresRouteProp>()
	const { measures } = route.params
	const navigation = useNavigation<any>()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Listagem de Medidas</Text>

			{measures && measures.length > 0 ? (
				<FlatList
					data={measures}
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
									<Pressable onPress={() => {}}>
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
})
