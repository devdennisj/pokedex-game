import { apiClient } from "./utils";

interface Pokemon {
	name: string;
	sprites: {
		front_default: string;
	};
}

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
	const { data } = await apiClient.get(`/pokemon/${id}`);

	return data;
};
