import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getData } from "../../api/getAnime";

type Props = {};

function WelcomeScreen({}: Props) {
	return (
		<SafeAreaView style={style.container}>
			<Text>Welcome, user</Text>
		</SafeAreaView>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
export default WelcomeScreen;
