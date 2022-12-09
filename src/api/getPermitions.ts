import axios from "axios";
import { apiKeys } from "../constants/apikeys";

const options = {
	uri: "https://anilist.co/api/v2/oauth/token",
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	json: {
		grant_type: "authorization_code",
		client_id: apiKeys.clientId,
		client_secret: apiKeys.clientSecret,
		redirect_uri: apiKeys.redirectUrl, // http://example.com/callback
		code: "", // The Authorization Code received previously
	},
};

export const getAccessToken = (code: string) =>
	axios.post(
		options.uri,
		{ ...options.json, code },
		{ headers: options.headers }
	);
