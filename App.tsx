import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/Login/index";
import WelcomeScreen from "./src/screens/Welcome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AnimeList, LikeList } from "./src/screens";
import AuthorizedStack from "./src/routes/AuthorizedStack";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="TabStack"
					component={AuthorizedStack}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
