import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2";

export const apiClient = axios.create({
	baseURL,
});