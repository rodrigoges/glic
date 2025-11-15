import { Ionicons } from '@expo/vector-icons'
import { Label } from '@react-navigation/elements'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Colors } from '../../styles/colors'

const Logo = require('../../assets/Logotype.png')

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<View style={styles.container}>
			<Image source={Logo} style={styles.logo} resizeMode="contain" />

			<Text style={styles.subtitle}>Seu bem-estar começa aqui.</Text>

			<View style={styles.form}>
				<Label style={styles.label}>E-mail</Label>
				<TextInput
					placeholder="Digite seu e-mail"
					placeholderTextColor={Colors.grey300}
					style={styles.input}
				/>

				<View style={styles.passwordContainer}>
					<Label style={[styles.label, styles.labelPassword]}>Senha</Label>
					<TextInput
						placeholder="Digite sua senha"
						style={[styles.input, styles.passwordInput]}
						placeholderTextColor={Colors.grey300}
						secureTextEntry={!showPassword}
					/>

					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
						style={styles.eyeButton}
					>
						<Ionicons
							name={showPassword ? 'eye' : 'eye-off'}
							size={22}
							color={Colors.grey300}
						/>
					</TouchableOpacity>
				</View>

				<Link href="/" style={styles.forgotPassword}>
					Esqueceu sua senha?
				</Link>

				<TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
					<Text style={styles.primaryButtonText}>Entrar</Text>
				</TouchableOpacity>
			</View>

			<Link href="/" style={styles.bottomLink}>
				Não possui uma conta?
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white100,
		paddingHorizontal: 24,
		paddingTop: 72,
	},

	logo: {
		width: 120,
		height: 40,
		marginBottom: 24,
	},

	subtitle: {
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 32,
		color: Colors.black900,
	},

	form: {
		flexGrow: 1,
	},

	label: {
		fontSize: 14,
		fontWeight: '500',
		color: Colors.black900,
		marginBottom: 8,
		textAlign: 'left',
	},

	labelPassword: {
		marginTop: 16,
	},

	input: {
		height: 52,
		borderRadius: 12,
		paddingHorizontal: 16,
		backgroundColor: Colors.white200,
		marginBottom: 4,
	},

	forgotPassword: {
		marginTop: 8,
		marginBottom: 24,
		alignSelf: 'flex-end',
		fontSize: 13,
		textDecorationLine: 'underline',
		color: Colors.grey300,
	},

	primaryButton: {
		height: 52,
		borderRadius: 16,
		backgroundColor: Colors.blue100,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
	},

	primaryButtonText: {
		color: Colors.white100,
		fontWeight: '600',
		fontSize: 16,
	},

	bottomLink: {
		textAlign: 'center',
		fontSize: 13,
		textDecorationLine: 'underline',
		marginBottom: 24,
		color: Colors.grey300,
	},

	passwordContainer: {
		justifyContent: 'center',
	},

	passwordInput: {
		paddingRight: 45,
	},

	eyeButton: {
		position: 'absolute',
		right: 28,
		top: 18,
		height: '100%',
		justifyContent: 'center',
	},
})
