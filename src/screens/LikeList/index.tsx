import { useMutation, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "react-native-svg";
import LikedAnimeItem from "../../components/LikedAnimeItem";
import { GET_LIKED_ANIME } from "../../query/anime";
import { POST_LIKE } from "../../query/like";

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
	const { data, loading, error } = useQuery(GET_LIKED_ANIME);
	const [mutateLike] = useMutation(POST_LIKE);

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
	const filterAnime = useMemo(() => dummy.filter(({ like }) => like), []);

	const handleDislike = useCallback(async (id: number) => {
		filterAnime.filter(({ id }: any) => id === id);

		mutateLike({
			variables: { mediaId: id },
			optimisticResponse: {
				ToggleLike: {
					id: id,
				},
			},
		});
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
