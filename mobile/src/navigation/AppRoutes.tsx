import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ForgotPassword from '../screens/ForgotPassword'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
