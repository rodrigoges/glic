import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	useNavigation,
	useRoute,
	type RouteProp,
} from '@react-navigation/native'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import NavBar from '../../components/NavBar'
import { api } from '../../services/api'
import { Colors } from '../../styles/colors'
import type { AddMeasureResponse, UpdateMeasureRequest } from '../../types'

type JwtPayload = {
	sub: string
}

type UpdateMeasureRouteProp = RouteProp<
	{
		UpdateMeasure: {
			measureId: string
			value: number
			dateCreation: string
		}
	},
	'UpdateMeasure'
>

export default function UpdateMeasure() {
	const route = useRoute<UpdateMeasureRouteProp>()
	const { measureId, value, dateCreation } = route.params
	const [loading, setLoading] = useState(false)
	const [addMeasureValue, setAddMeasureValue] = useState<number>(0)
	const [startDate, setStartDate] = useState('')
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
	const navigation = useNavigation<any>()

	useEffect(() => {
		setAddMeasureValue(value)

		const parsed = dayjs(dateCreation)
		if (parsed.isValid()) {
			setStartDate(parsed.format('DD/MM/YYYY'))
		}
	}, [value, dateCreation])

	const updateMeasure = async () => {
		setLoading(true)
		try {
			const token = await AsyncStorage.getItem('token')
			if (!token) {
				console.warn('Token não encontrado')
				setLoading(false)
				return
			}

			const decoded = jwtDecode<JwtPayload>(token)
			const email = decoded.sub

			let dateIso = dateCreation // começa com a data original vinda da rota

			if (startDate && isValidBrDate(startDate)) {
				const dt = brToDate(startDate)
				dateIso = dt.toISOString()
			}

			const payload: UpdateMeasureRequest = {
				measureId,
				value: addMeasureValue,
				offsetDateTime: dateIso,
				email,
			}

			await api.put<AddMeasureResponse>('/measures', payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			navigation.navigate('Home')
		} catch (error: any) {
			console.log(error?.response?.data || error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Atualização de Glicemia</Text>

			<View style={styles.measureValueContainer}>
				<Text style={styles.measureValueText}>Valor da Glicemia</Text>
				<View style={styles.measureValueInputContainer}>
					<TextInput
						keyboardType="numeric"
						placeholder="000"
						style={styles.measureValueInput}
						maxLength={3}
						value={Number.isNaN(addMeasureValue) ? '' : String(addMeasureValue)}
						onChangeText={(text) => setAddMeasureValue(Number(text))}
					/>
					<Text style={styles.measureValueUnit}>mg/dL</Text>
				</View>
			</View>

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
				</View>
			</View>

			<View style={styles.infoStatusContainer}>
				<View style={styles.infoStatusItem}>
					<Text style={styles.infoStatusItemText}>
						Valores menores que 70 são considerados baixos. (Hipoglicemia)
					</Text>
				</View>
				<View style={styles.infoStatusItem}>
					<Text style={styles.infoStatusItemText}>
						Valores entre 70 e 180 são valores considerados normais.
					</Text>
				</View>
				<View style={styles.infoStatusItem}>
					<Text style={styles.infoStatusItemText}>
						Valores acima de 180 são considerados altos. (Hiperglicemia).
					</Text>
				</View>
			</View>

			<Pressable onPress={updateMeasure} style={styles.button}>
				{loading ? (
					<ActivityIndicator color={Colors.White100} />
				) : (
					<Text style={styles.textButton}>Atualizar Marcação</Text>
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

	measureValueContainer: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 8,
		marginTop: 8,
	},

	measureValueText: {
		color: Colors.Black900,
		fontFamily: 'Sora_600SemiBold',
		fontSize: 18,
	},

	measureValueInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	measureValueInput: {
		color: Colors.Black900,
		fontFamily: 'Sora_800ExtraBold',
		borderRadius: 8,
		fontSize: 64,
	},

	measureValueUnit: {
		color: Colors.Grey300,
		fontFamily: 'Sora_400Regular',
		fontSize: 24,
	},

	infoStatusContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: 4,
	},

	infoStatusItem: {
		backgroundColor: Colors.White200,
		padding: 16,
		borderRadius: 8,
	},

	infoStatusItemText: {
		color: Colors.Grey300,
		fontFamily: 'Sora_400Regular',
		fontSize: 14,
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

	dateFilterInputsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	dateFilterButtonText: {
		color: Colors.Grey300,
		fontFamily: 'Sora_700Bold',
	},
})
