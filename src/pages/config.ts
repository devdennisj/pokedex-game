interface Route {
	id: string;
	path: string
}

export const routes: Record<string, Route> = {
	root: {
		id: "root",
		path: "/"
	},
	game: {
		id: "game-root",
		path: "game"
	},
	pokedex: {
		id: "pokedex",
		path: "pokedex"
	}
}
