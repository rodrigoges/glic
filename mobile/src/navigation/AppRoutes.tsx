import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ForgotPassword from '../screens/ForgotPassword'
import Home from '../screens/Home'
import ListMeasures from '../screens/ListMeasures'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Search from '../screens/Search'
import UpdatePassword from '../screens/UpdatePassword'

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
				<Stack.Screen name="UpdatePassword" component={UpdatePassword} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Search" component={Search} />
				<Stack.Screen name="ListMeasures" component={ListMeasures} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
