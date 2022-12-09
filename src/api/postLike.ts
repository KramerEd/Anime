import { gql } from "@apollo/client";

const query = gql`
	mutation postLike($mediaId: Int) {
		ToggleLike(id: $mediaId) {
			id
		}
	}
`;

// Define the config we'll need for our Api request
const url = "https://graphql.anilist.co";

export const postLike = async (token: string, id: number) => {
	fetch(url, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			query: query,
			variables: { id },
		}),
	})
		.then(handleResponse)
		.then(handleData)
		.catch(handleError);
};

export function handleResponse(response: any) {
	return response.json().then(function (json: any) {
		return response.ok ? json : Promise.reject(json);
	});
}

export function handleData(data: any) {
	console.log(data);
}

export function handleError(error: Error) {
	console.error(error);
}
