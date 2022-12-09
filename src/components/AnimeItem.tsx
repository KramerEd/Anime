import React, { useCallback, useMemo, useState } from "react";
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import Heart from "../icons/HeartRed.svg";
import HeartOff from "../icons/HeartBlack.svg";

type Props = { title: string; description: string; img: string };

function AnimeItem({ title, description, img }: Props) {
	const [like, setLike] = useState(false);
	const [load, setLoad] = useState(true);

	const handleLike = useCallback(() => {
		setLike(true);
	}, []);
	const handleUnLike = useCallback(() => {
		setLike(false);
	}, []);

	const LikeComp = useMemo(
		() => (
			<TouchableOpacity onPress={handleUnLike}>
				<Heart width={30} height={30} />
			</TouchableOpacity>
		),
		[]
	);
	const UnLikeComp = useMemo(
		() => (
			<TouchableOpacity onPress={handleLike}>
				<HeartOff width={30} height={30} />
			</TouchableOpacity>
		),
		[]
	);
	return (
		<View style={style.container}>
			<View style={style.containerImages}>
				<View style={{ position: "relative" }}>
					<Image
						source={{ uri: img, width: 100, height: 100 }}
						style={[style.image, { opacity: load ? 0 : 1 }]}
						onLoadEnd={() => {
							setLoad(false);
						}}
					/>
					{load && <ActivityIndicator style={style.loader} />}
				</View>
				{like ? LikeComp : UnLikeComp}
			</View>
			<Text style={style.title}>{title}</Text>
			<Text>{description}</Text>
		</View>
	);
}

const style = StyleSheet.create({
	loader: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [{ translateX: -10 }, { translateY: -5 }],
	},
	containerHeart: {
		width: 30,
		height: 30,
	},
	containerImages: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container: {
		marginBottom: 10,
		padding: 10,
		justifyContent: "space-between",
		borderColor: "black",
		borderBottomWidth: 1,
	},
	title: {
		fontSize: 20,
	},
	image: {
		borderRadius: 10,
	},
});

export default AnimeItem;
