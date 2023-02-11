import { apiClient } from "./utils";

export interface GenerationPokemon {
	name: string;
	url: string;
}

export interface Generation {
	pokemon_species: GenerationPokemon[];
}

export const fetchGeneration = async (generation?: number): Promise<Generation> => {
	const { data } = await apiClient.get(`/generation/${generation ?? 1}`);

	return data;
};