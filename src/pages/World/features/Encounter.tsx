import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import {
	fetchPokemon,
	getPokemonSchema,
	pokemonQueryKey,
} from "../../../data/pokemon";
import { useChannelStore } from "../../../stores/channels";
import { useGameStateStore } from "../../../stores/game_state";

const schema = getPokemonSchema();

function Encounter() {
	const syncChannel = useChannelStore((state) => state.channels.pokemonSync);
	const activeEncounter = useGameStateStore((state) => state.activeEncounter);
	const setEncounter = useGameStateStore((state) => state.setEncounter);

	const { data } = useQuery({
		queryKey: [pokemonQueryKey, activeEncounter],
		queryFn: () => fetchPokemon(activeEncounter),
	});

	const handleBroadcastMessage = (message: MessageEvent) => {
		try {
			const { name } = schema.parse(message.data);

			setEncounter(name);
		} catch (_) {
			console.error("Invalid broadcasting data");
		}
	};

	useEffect(() => {
		syncChannel.addEventListener("message", handleBroadcastMessage);

		return () => {
			syncChannel.removeEventListener("message", handleBroadcastMessage);
		};
	}, []);

	if (!data) {
		return <></>;
	}

	return (
		<div>
			<div className='flex flex-col items-center'>
				<img src={data.sprites.front_default} width={150} height={150} />
			</div>
			<article className='prose lg:prose-lg prose-headings:mb-0 prose-p:mt-4'>
				<h1 className='capitalize text-[#454545]'>{data.name}</h1>
			</article>
		</div>
	);
}

export default Encounter;
