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

export const pokemonQueryKey = "pokemon";

export const fetchPokemon = async (name: string | undefined): Promise<Pokemon> => {
	const { data } = await apiClient.get(`/pokemon/${name ?? 1}`);

	return data;
};
