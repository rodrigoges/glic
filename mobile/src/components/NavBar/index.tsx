import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/colors'

export default function NavBar() {
	const navigation = useNavigation<any>()
	const route = useRoute<any>()
	const current = route.name

	const items = [
		{ key: 'Home', label: 'Início', icon: 'home' },
		{ key: 'Add', label: 'Adicionar', icon: 'plus-circle' },
		{ key: 'Search', label: 'Pesquisar', icon: 'search' },
	]

	return (
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
						onPress={() => navigation.navigate(it.key)}
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
		gap: 4,
		flexDirection: 'row',
		padding: 12,
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
		marginLeft: 8,
	},

	navBarItemTextInactive: {
		color: Colors.Grey300,
		fontFamily: 'Sora_400Regular',
		marginLeft: 8,
	},
})
