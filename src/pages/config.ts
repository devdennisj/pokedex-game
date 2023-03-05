interface Route {
	id?: string;
	path: string
}

export const routes: Record<string, Route> = {
	root: {
		path: "/"
	},
	game: {
		id: "game-root",
		path: "game"
	},
	pokedex: {
		path: "pokedex"
	},
	quests: {
		path: "quests"
	},
	town: {
		path: "town"
	},
	npc: {
		path: "npc/:id",
	}
}
