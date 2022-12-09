import { useQuery } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";
import AnimeItem from "../../components/AnimeItem";
import { GET_ALL_ANIME } from "../../query/anime";

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
	const { data, loading, error } = useQuery(GET_ALL_ANIME);

	if (loading) {
		return (
			<View style={style.flatList}>
				<ActivityIndicator />
			</View>
		);
	}
	if (error) {
		return (
			<View style={style.flatList}>
				<Text>{error.message}</Text>
			</View>
		);
	}

	useFocusEffect(
		useCallback(() => {
			if (!loading) {
				setList(data.getData());
			}
		}, [])
	);

	return (
		<FlatList
			style={{ padding: 10 }}
			data={list}
			renderItem={({ item }) => <AnimeItem {...(item as any)} />}
		/>
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
