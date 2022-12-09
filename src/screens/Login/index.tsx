import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import WebView from "react-native-webview";
import qs from "qs";
import { getAccessToken } from "../../api/getPermitions";
import { apiKeys } from "../../constants/apikeys";

type Props = {};

const LoginScreen = (props: Props) => {
	const { navigate } = useNavigation();

	const getToken = useCallback(async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			return token;
		} catch (e) {
			console.error(e);
		}
	}, []);

	const storeToken = useCallback(async (code: string) => {
		try {
			await AsyncStorage.setItem("token", code);
		} catch (e) {
			console.error(e);
		}
	}, []);

	const handleUserLogin = useCallback(({ url }: any) => {
		const code = qs.parse(url);

		Object.keys(code).map(async (key) => {
			if (key.includes("code")) {
				try {
					const res = await getAccessToken(code[key] as string);
					if (res.status === 200) {
						await storeToken(res.data?.access_token);
						if (res.data?.access_token) {
							navigate("TabStack", { screen: "Welcome" });
						}
					}
				} catch (error) {
					console.error(error, "Login Error");
				}
			}
		});
	}, []);

	return (
		<WebView
			source={{
				uri: `https://anilist.co/api/v2/oauth/authorize?client_id=${apiKeys.clientId}&redirect_uri=https://anilist.co/api/v2/oauth/pin&response_type=code`,
			}}
			onNavigationStateChange={handleUserLogin}
			style={styles.webView}
		/>
	);
};

const styles = StyleSheet.create({
	webView: {
		flex: 1,
	},
});
export default LoginScreen;
