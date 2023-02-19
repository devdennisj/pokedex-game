import { z } from "zod";

import { apiClient } from "./utils";

export interface Pokemon {
	name: string;
	sprites: {
		front_default: string;
	};
}

export function getPokemonSchema() {
	return z.object({
		name: z.string(),
	});
}

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
	const { data } = await apiClient.get(`/pokemon/${name}`);

	return data;
};
