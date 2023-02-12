import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
	fetchPokemon,
	getPokemonSchema,
	pokemonQueryKey,
} from "../../../data/pokemon";
import { useChannelStore } from "../../../stores/channels";

const schema = getPokemonSchema();

function Encounter({ id }: { id: number }) {
	const [currentId, setCurrentId] = useState(id);
	const syncChannel = useChannelStore((state) => state.channels.pokemonSync);

	const { data } = useQuery({
		queryKey: [pokemonQueryKey, currentId],
		queryFn: () => fetchPokemon(currentId),
	});

	const handleBroadcastMessage = (message: MessageEvent) => {
		try {
			const { id: broadcastId } = schema.parse(message.data);

			setCurrentId(broadcastId);
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
