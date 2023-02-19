import { create } from "zustand";

import { Pokemon, fetchPokemon } from "../data/pokemon";

interface FoundPokemon {
	pokemon: Pokemon,
	metaData: {
		added: Date
	}
}

interface PokedexStore {
	recentlyAdded: FoundPokemon[];
	collected: FoundPokemon[]
	addNewPokemon: (name: string) => void
}

export const usePokedexStore = create<PokedexStore>((set) => ({
	recentlyAdded: [],
	collected: [],
	addNewPokemon: async (name) => {
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

		set((state) => ({
			collected: [
				...state.collected,
				foundPokemon
			],
			recentlyAdded: [
				...state.recentlyAdded,
				foundPokemon
			],
		}));
	}
}));