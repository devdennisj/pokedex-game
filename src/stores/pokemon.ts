import { create } from "zustand";

import { Pokemon, fetchPokemon } from "../data/pokemon";

export interface FoundPokemon {
	pokemon: Pokemon,
	metaData: {
		added: Date
	}
}

interface PokedexStore {
	// TODO recentlyAdded should be calculated when used instead of
	// being kept in state
	recentlyAdded: FoundPokemon[];
	collected: FoundPokemon[]
	getPokemon: (name: string) => Promise<FoundPokemon>
}

export const usePokedexStore = create<PokedexStore>((set, get) => ({
	recentlyAdded: [],
	collected: [],
	getPokemon: async (name) => {

		const { collected } = get();

		const idx = collected.findIndex(
			({ pokemon }) => pokemon.name === name
		);

		if (idx > -1) {
			return collected[idx]
		} else {
			const pokemon = await fetchPokemon(name)

			const foundPokemon: FoundPokemon = {
				pokemon: {
					name: pokemon.name,
					sprites: {
						front_default: pokemon.sprites.front_default
					}
				},
				metaData: {
					added: new Date(Date.now())
				}
			}

			set((state) => {

				return {
					collected: [
						...state.collected,
						foundPokemon
					],
					recentlyAdded: [
						...state.recentlyAdded,
						foundPokemon
					],
				}
			});

			return foundPokemon
		}
	}
}));