import { create } from "zustand";

const pokemonSync = new BroadcastChannel("pokemon-sync");

export const useChannelStore = create(() => ({
	channels: {
		pokemonSync
	},
}));