import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Heart from "../icons/HeartRed.svg";

type Props = {
	title: string;
	description: string;
	img: string;
	handleDeleteLike: any;
};

function LikedAnimeItem({ title, description, img, handleDeleteLike }: Props) {
	const [load, setLoad] = useState(true);

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
					<TouchableOpacity onPress={handleDeleteLike}>
						<Heart width={30} height={30} />
					</TouchableOpacity>
				</View>
			</View>
			<Text style={style.title}>{title}</Text>
			<Text>{description}</Text>
		</View>
	);
}

export default LikedAnimeItem;

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
