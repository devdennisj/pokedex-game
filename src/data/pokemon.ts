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
		name: z.string(),
	});
}

export const pokemonQueryKey = "pokemon";

export const fetchPokemon = async (name: string | undefined): Promise<Pokemon> => {

	const { data } = await apiClient.get(`/pokemon/${name ?? 0}`);

	return data;
};
