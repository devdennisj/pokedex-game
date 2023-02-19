import { useRouteLoaderData } from "react-router-dom";

import { GenerationPokemon } from "../../data/generation";
import { useChannelStore } from "../../stores/channels";
import { useGameStateStore } from "../../stores/game_state";
import { usePokedexStore } from "../../stores/pokemon";

import Encounter from "./features/Encounter";


function World() {
	const generationData = useRouteLoaderData("root") as GenerationPokemon[];

	const syncChannel = useChannelStore((state) => state.channels.pokemonSync);
	const setEncounter = useGameStateStore((state) => state.setEncounter);
	const nextEncounter = useGameStateStore((state) => state.nextEncounter);
	const setNextEncounter = useGameStateStore((state) => state.setNextEncounter);
	const addNewPokemon = usePokedexStore((state) => state.addNewPokemon);

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

		addNewPokemon(name)
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
