import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import NavBar from '../../components/NavBar'
import { api } from '../../services/api'
import { Colors } from '../../styles/colors'
import type { MeasureResponse } from '../../types'

export default function Search() {
	const [measures, setMeasures] = useState<MeasureResponse[] | null>(null)
	const navigation = useNavigation<any>()
	const [loading, setLoading] = useState(false)
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [status, setStatus] = useState('')
	const formatDate = (text: string) => {
		const digits = text.replace(/\D/g, '')

		if (digits.length <= 2) return digits
		if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
		return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`
	}

	const parseBrToDayjs = (date: string): Dayjs | null => {
		if (date.length !== 10) return null
		const [d, m, y] = date.split('/').map(Number)
		if (!d || !m || !y) return null

		const iso = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(
			2,
			'0'
		)}`
		const parsed = dayjs(iso)
		return parsed.isValid() ? parsed : null
	}

	const isValidBrDate = (date: string) => {
		return !!parseBrToDayjs(date)
	}

	const brToDate = (date: string, endOfDay = false) => {
		const [d, m, y] = date.split('/').map(Number)
		const dt = new Date(y, m - 1, d)
		if (endOfDay) {
			dt.setHours(23, 59, 59, 999)
		} else {
			dt.setHours(0, 0, 0, 0)
		}
		return dt
	}

	const fetchMeasures = async () => {
		setLoading(true)
		try {
			const token = await AsyncStorage.getItem('token')

			const payload: {
				from?: string
				to?: string
				status?: string
			} = {}

			if (startDate && isValidBrDate(startDate)) {
				const start = brToDate(startDate, false)
				payload.from = start.toISOString()
			}

			if (endDate && isValidBrDate(endDate)) {
				const end = brToDate(endDate, true)
				payload.to = end.toISOString()
			}

			if (status) {
				payload.status = status
			}

			const response = await api.get<MeasureResponse[]>('/measures', {
				params: payload,
				headers: {
					Authorization: token ? `Bearer ${token}` : '',
				},
			})
			setMeasures(response.data ?? [])
			navigation.navigate('ListMeasures', {
				measures: response.data ?? [],
			})
		} catch (error: any) {
			console.log(error?.response?.data || error)
			setMeasures([])
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Consulta de Medidas</Text>

			<View style={styles.dateFilterContainer}>
				<Text>Data:</Text>
				<View style={styles.dateFilterInputsContainer}>
					<View style={styles.dateFilterInputContainer}>
						<Feather name="calendar" size={16} color={Colors.Grey300} />
						<TextInput
							placeholder="dd/MM/yyyy"
							placeholderTextColor={Colors.Grey300}
							value={startDate}
							onChangeText={(t) => setStartDate(formatDate(t))}
							keyboardType="numeric"
							style={styles.dateFilterButtonText}
						/>
					</View>

					<View style={styles.dateFilterInputContainer}>
						<Feather name="calendar" size={16} color={Colors.Grey300} />
						<TextInput
							placeholder="dd/MM/yyyy"
							placeholderTextColor={Colors.Grey300}
							value={endDate}
							onChangeText={(t) => setEndDate(formatDate(t))}
							keyboardType="numeric"
							style={styles.dateFilterButtonText}
						/>
					</View>
				</View>
			</View>

			<View style={styles.statusFilterButtonsContainer}>
				<TouchableOpacity
					onPress={() => setStatus('LOW')}
					style={[
						styles.statusFilterButton,
						status === 'LOW' && styles.statusFilterButtonActive,
					]}
				>
					<Text
						style={[
							styles.statusFilterButtonText,
							status === 'LOW' && styles.statusFilterButtonTextActive,
						]}
					>
						Baixo
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setStatus('NORMAL')}
					style={[
						styles.statusFilterButton,
						status === 'NORMAL' && styles.statusFilterButtonActive,
					]}
				>
					<Text
						style={[
							styles.statusFilterButtonText,
							status === 'NORMAL' && styles.statusFilterButtonTextActive,
						]}
					>
						Normal
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setStatus('HIGH')}
					style={[
						styles.statusFilterButton,
						status === 'HIGH' && styles.statusFilterButtonActive,
					]}
				>
					<Text
						style={[
							styles.statusFilterButtonText,
							status === 'HIGH' && styles.statusFilterButtonTextActive,
						]}
					>
						Alto
					</Text>
				</TouchableOpacity>
			</View>

			<Pressable onPress={fetchMeasures} style={styles.button}>
				{loading ? (
					<ActivityIndicator color={Colors.White100} />
				) : (
					<Text style={styles.textButton}>Consultar Marcações</Text>
				)}
			</Pressable>
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

	dateFilterContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginTop: 64,
		gap: 8,
	},

	dateFilterInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8,
		backgroundColor: Colors.White200,
		borderRadius: 12,
		width: '48%',
		gap: 8,
		color: Colors.Black900,
	},

	statusFilterContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: 8,
	},

	statusFilterButton: {
		padding: 8,
		backgroundColor: Colors.White200,
		borderRadius: 12,
		width: '30%',
		alignItems: 'center',
	},

	statusFilterButtonText: {
		color: Colors.Grey300,
		fontFamily: 'Sora_700Bold',
	},

	button: {
		backgroundColor: Colors.Blue100,
		height: 60,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 24,
	},

	textButton: {
		color: Colors.White100,
		fontFamily: 'Sora_600SemiBold',
		fontSize: 20,
	},

	statusFilterButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 8,
	},

	dateFilterInputsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	dateFilterButtonText: {
		color: Colors.Grey300,
		fontFamily: 'Sora_700Bold',
	},
	statusFilterButtonActive: {
		backgroundColor: Colors.Blue100,
	},

	statusFilterButtonTextActive: {
		color: Colors.White100,
	},
})
