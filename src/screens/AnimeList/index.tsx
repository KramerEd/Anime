import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { getData } from "../../api/getAnime";
import AnimeItem from "../../components/AnimeItem";

const dummy = [
	{
		title: "Anime",
		description: "Anime Description",
		img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Anime_Girl.svg/1200px-Anime_Girl.svg.png",
	},
	{
		title: "Anime",
		description: "Anime Description",
		img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Anime_Girl.svg/1200px-Anime_Girl.svg.png",
	},
	{
		title: "Anime",
		description: "Anime Description",
		img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Anime_Girl.svg/1200px-Anime_Girl.svg.png",
	},
	{
		title: "Anime",
		description:
			"Anime Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptate veniam magni nesciunt distinctio libero laborum iure consequatur exercitationem voluptates mollitia sequi fugit provident amet minus perspiciatis dolor, praesentium ex?",
		img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Anime_Girl.svg/1200px-Anime_Girl.svg.png",
	},
];

function AnimeList() {
	const [list, setList] = useState([]);
	const [message, setMessage] = useState("");
	const getToken = useCallback(async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			return token;
		} catch (e) {
			console.error(e);
		}
	}, []);

	const handleFetch = async () => {
		try {
			const token = await getToken();

			const { data } = await getData(token as string, 1);

			setList(data);
		} catch (error) {
			setMessage("No data.");
			setList([...dummy] as any);
			console.error(error);
		}
	};
	useFocusEffect(
		useCallback(() => {
			handleFetch();
		}, [])
	);

	return (
		<>
			{list.length ? (
				<FlatList
					style={{ padding: 10 }}
					data={dummy}
					renderItem={({ item }) => <AnimeItem {...(item as any)} />}
				/>
			) : (
				<View style={style.flatList}>
					<ActivityIndicator />
				</View>
			)}
		</>
	);
}

const style = StyleSheet.create({
	flatList: {
		padding: 10,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default AnimeList;
