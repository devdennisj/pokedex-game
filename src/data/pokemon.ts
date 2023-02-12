import { z } from "zod";
import { apiClient } from "./utils";

interface Pokemon {
	name: string;
	sprites: {
		front_default: string;
	};
}

export function getPokemonSchema() {
	return z.object({
		id: z.number(),
	});
}

export const pokemonQueryKey = "pokemon";

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
	const { data } = await apiClient.get(`/pokemon/${id}`);

	return data;
};
