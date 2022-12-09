import React from "react";
import { AnimeList } from "../screens";
import WelcomeScreen from "../screens/Welcome";
import LikeList from "../screens/LikeList/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

type Props = {};
const Tab = createBottomTabNavigator();

function AuthorizedStack({}: Props) {
	return (
		<Tab.Navigator initialRouteName="Welcome">
			<Tab.Screen
				name="AnimeList"
				component={AnimeList}
				options={{ tabBarLabel: "Dashboard" }}
			/>
			<Tab.Screen
				name="LikeList"
				component={LikeList}
				options={{ tabBarLabel: "Liked anime" }}
			/>
			<Tab.Screen
				name="Welcome"
				component={WelcomeScreen}
				options={{ headerShown: false, tabBarLabel: "Account" }}
			/>
		</Tab.Navigator>
	);
}

export default AuthorizedStack;
