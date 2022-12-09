import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import AnimeItem from "../../components/AnimeItem";
import { getLikedData } from "../../api/getLikedPosts";
import LikedAnimeItem from "../../components/LikedAnimeItem";
import { postLike } from "../../api/postLike";

type Props = {};

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
		like: true,
	},
	{
		title: "Anime",
		description:
			"Anime Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptate veniam magni nesciunt distinctio libero laborum iure consequatur exercitationem voluptates mollitia sequi fugit provident amet minus perspiciatis dolor, praesentium ex?",
		img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Anime_Girl.svg/1200px-Anime_Girl.svg.png",
		like: true,
	},
];

function AnimeList({}: Props) {
	const [list, setList] = useState([]);
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

			const { data } = await getLikedData(token as string, 1);

			setList(data);
		} catch (error) {
			setList([...dummy] as any);
		}
	};
	useFocusEffect(
		useCallback(() => {
			handleFetch();
		}, [])
	);

	const filterAnime = useMemo(() => dummy.filter(({ like }) => like), []);

	const handleDislike = useCallback(async (id: number) => {
		const token = await getToken();

		filterAnime.filter(({ id }: any) => id === id);
		await postLike(token, id);
	}, []);

	return (
		<>
			{list.length ? (
				<FlatList
					style={{ padding: 10 }}
					data={filterAnime}
					renderItem={({ item }) => (
						<LikedAnimeItem
							{...(item as any)}
							handleDeleteLike={handleDislike}
						/>
					)}
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
