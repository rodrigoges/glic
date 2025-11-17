import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { api } from '../../services/api'
import { Colors } from '../../styles/colors'
import type { RegisterRequest, RegisterResponse } from '../../types'

export default function Register() {
	const navigation = useNavigation<any>()
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const handleRegister = async () => {
		if (!email || !password || !fullName) {
			Alert.alert('Atenção', 'Preencha nome, e-mail e senha.')
			return
		}

		setLoading(true)

		try {
			const payload: RegisterRequest = {
				fullName,
				email,
				password,
			}

			await api.post<RegisterResponse>('/users', payload)
		} catch (error: any) {
			console.log(error?.response?.data || error)
			const message =
				error?.response?.data?.message ??
				'Não foi possível realizar o cadastro. Tente novamente.'
			Alert.alert('Erro', message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/Logo.png')}
				width={300}
				height={300}
			/>

			<Text style={styles.title}>
				Mais controle, mais liberdade. Comece agora.
			</Text>

			<Text style={styles.label}>Nome Completo</Text>
			<TextInput
				style={styles.input}
				placeholder="Digite seu nome completo"
				placeholderTextColor={Colors.Grey300}
				value={fullName}
				onChangeText={setFullName}
			/>

			<Text style={styles.label}>E-mail</Text>
			<TextInput
				style={styles.input}
				placeholder="Digite seu e-mail"
				placeholderTextColor={Colors.Grey300}
				autoCapitalize="none"
				keyboardType="email-address"
				value={email}
				onChangeText={setEmail}
			/>

			<Text style={styles.label}>Senha</Text>
			<View>
				<TextInput
					style={styles.input}
					placeholder="Digite sua senha"
					secureTextEntry={!showPassword}
					placeholderTextColor={Colors.Grey300}
					value={password}
					onChangeText={setPassword}
				/>

				<Pressable
					style={styles.icon}
					onPress={() => setShowPassword(!showPassword)}
				>
					<Feather
						name={showPassword ? 'eye' : 'eye-off'}
						size={24}
						color={Colors.Black900}
					/>
				</Pressable>
			</View>

			<Pressable style={styles.button} onPress={handleRegister}>
				{loading ? (
					<ActivityIndicator color={Colors.White100} />
				) : (
					<Text style={styles.textButton}>Cadastrar</Text>
				)}
			</Pressable>

			<Pressable
				style={styles.createAccountLinkContainer}
				onPress={() => navigation.navigate('Login')}
			>
				<Text style={styles.link}>Já possui uma conta?</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.White100,
		justifyContent: 'center',
		paddingHorizontal: 24,
		gap: 16,
	},

	title: {
		color: Colors.Black900,
		fontSize: 20,
		fontFamily: 'Sora_600SemiBold',
	},

	label: {
		color: Colors.Black900,
		fontSize: 16,
		fontFamily: 'Sora_400Regular',
	},

	input: {
		backgroundColor: Colors.White200,
		borderRadius: 8,
		height: 60,
		paddingHorizontal: 16,
		paddingVertical: 4,
		fontSize: 16,
		fontFamily: 'Sora_400Regular',
	},

	icon: {
		position: 'absolute',
		right: 16,
		top: 18,
	},

	link: {
		color: Colors.Black900,
		fontSize: 14,
		fontFamily: 'Sora_400Regular',
		textDecorationLine: 'underline',
	},

	forgotPasswordLinkContainer: {
		alignItems: 'flex-end',
	},

	createAccountLinkContainer: {
		alignItems: 'center',
	},

	button: {
		backgroundColor: Colors.Blue100,
		height: 60,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},

	textButton: {
		color: Colors.White100,
		fontSize: 20,
		fontFamily: 'Sora_600SemiBold',
	},
})
