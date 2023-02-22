import { useRouteLoaderData } from "react-router-dom";

import { GenerationPokemon } from "../../data/generation";
import { useChannelStore } from "../../stores/channels";
import { useGameStateStore } from "../../stores/game_state";
import { usePokedexStore } from "../../stores/pokemon";

import Encounter from "./features/Encounter";
import { routes } from "../Router";

type RouterData = GenerationPokemon[] | undefined

function World() {
	const generationData = useRouteLoaderData(routes.root) as RouterData ?? [];

	const syncChannel = useChannelStore((state) => state.channels.pokemonSync);
	const setEncounter = useGameStateStore((state) => state.setEncounter);
	const nextEncounter = useGameStateStore((state) => state.nextEncounter);
	const setNextEncounter = useGameStateStore((state) => state.setNextEncounter);
	const getPokemon = usePokedexStore((state) => state.getPokemon);

	const getIndex = () => {
		const generationSize = generationData.length;

		return Math.floor(Math.random() * generationSize + 1);
	};

	const generateEncounter = async () => {
		const idx = nextEncounter ?? getIndex();
		const { name } = generationData[idx];

		setEncounter(name);
		setNextEncounter(undefined);

		syncChannel.postMessage({
			name,
		});
	};

	const handleOnHover = async () => {
		const idx = getIndex();

		const { name } = generationData[idx];

		getPokemon(name)
		setNextEncounter(idx);
	};

	return (
		<>
			<div className='container mx-auto flex flex-col items-center justify-between border-solid border-[1px] border-white p-4 rounded-lg max-w-[400px] min-h-[600px] bg-[#f2eecb]'>
				<div className='h-[200px]'>
					<Encounter />
				</div>
				<button
					className='btn btn-primary'
					onClick={generateEncounter}
					onMouseEnter={handleOnHover}
				>
					Go into the wilds
				</button>
			</div>
		</>
	);
}

export default World;
