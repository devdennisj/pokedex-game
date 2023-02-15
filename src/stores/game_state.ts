import { create } from "zustand";

interface GameState {
	activeEncounter: string | undefined;
	nextEncounter: number | undefined;
	setEncounter: (newEncounter: string) => void;
	setNextEncounter: (newEncounter: number | undefined) => void;
}

export const useGameStateStore = create<GameState>((set) => ({
	activeEncounter: undefined,
	nextEncounter: undefined,
	setEncounter: (newEncounter) => {
		set(() => ({ activeEncounter: newEncounter }));
	},
	setNextEncounter: (newEncounter) => {
		set(() => ({ nextEncounter: newEncounter }));
	},
}));
