import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { fetchGeneration } from "../../data/generation";
import { fetchPokemon } from "../../data/pokemon";
import { useChannelStore } from "../../stores/channels";

import Encounter from "./features/Encounter";

type PokemonIndex = undefined | number;

function World() {
	const queryClient = useQueryClient();
	const syncChannel = useChannelStore((state) => state.channels.pokemonSync);

	const { data: generationData } = useQuery({
		queryKey: ["generation"],
		queryFn: () => fetchGeneration(),
		select: (data) => data.pokemon_species,
	});

	const [currentPokemon, setCurrentPokemon] = useState<PokemonIndex>(undefined);
	const [nextPokemon, setNextPokemon] = useState<PokemonIndex>(undefined);

	if (!generationData) {
		return <></>;
	}

	const getIndex = () => {
		const generationSize = generationData.length;

		return Math.floor(Math.random() * generationSize + 1);
	};

	const generateEncounter = async () => {
		const idx = nextPokemon ?? getIndex();

		syncChannel.postMessage({
			id: idx,
		});

		setCurrentPokemon(idx);
		setNextPokemon(undefined);
	};

	const handleOnHover = async () => {
		const idx = getIndex();

		setNextPokemon(idx);

		await queryClient.prefetchQuery({
			queryKey: ["pokemon", idx],
			queryFn: () => fetchPokemon(idx),
		});
	};

	return (
		<>
			<div className='container mx-auto flex flex-col items-center justify-between border-solid border-[1px] border-white p-4 rounded-lg max-w-[400px] min-h-[600px] bg-[#f2eecb]'>
				<div className='h-[200px]'>
					{!!currentPokemon && <Encounter id={currentPokemon} />}
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
