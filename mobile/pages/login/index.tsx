import { Label } from '@react-navigation/elements'
import { Link } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../styles/colors'

import { Image } from 'react-native'
const Logo = require('../../assets/Logotype.png')

export default function LoginPage() {
	return (
		<View style={styles.container}>
			<Image source={Logo} />
			<Text>Seu bem-estar começa aqui.</Text>

			<Label>E-mail</Label>
			<TextInput placeholder="Digite seu e-mail" />

			<Label>Senha</Label>
			<TextInput placeholder="Digite sua senha" />

			<Link href="/">Esqueceu sua senha?</Link>

			<Button title="Entrar" onPress={() => {}} />
			<Button title="Entrar com o Google" onPress={() => {}} />

			<Link href="/">Não possui uma conta?</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white100,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
