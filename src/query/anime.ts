import { gql } from "@apollo/client";

export const GET_ALL_ANIME = gql`
	query getAllData($page: Int) {
		Page(page: $page) {
			media(type: ANIME) {
				id
				title {
					english
				}
				description
				bannerImage
			}
		}
	}
`;


export const GET_LIKED_ANIME = gql`
	query getLikedData($page: Int) {
		Page(page: $page) {
			media(type: ANIME, like: true) {
				id
				title {
					english
				}
				description
				bannerImage
			}
		}
	}
`;