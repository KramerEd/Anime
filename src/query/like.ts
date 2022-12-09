import { gql } from "@apollo/client";

export const POST_LIKE = gql`
	mutation mutateLike($mediaId: Int) {
		ToggleLike(id: $mediaId) {
			id
			title: {
				english
			}
		}
	}
`;
