import { useEffect, useState } from 'react';

import { getPokemonSchema } from '../../../data/pokemon';
import { useChannelStore } from '../../../stores/channels';
import { useGameStateStore } from '../../../stores/game_state';
import { FoundPokemon, usePokedexStore } from '../../../stores/pokemon';

const schema = getPokemonSchema();
const channelListenerName = "message"

function Encounter() {
	const syncChannel = useChannelStore((state) => state.channels.pokemonSync);
	const activeEncounter = useGameStateStore((state) => state.activeEncounter);
	const setEncounter = useGameStateStore((state) => state.setEncounter);
	const getPokemon = usePokedexStore((state) => state.getPokemon);
	const [activePokemon, setActivePokemon] = useState<undefined | FoundPokemon>(undefined)

	useEffect(() => {
		if (!activeEncounter) {
			return
		}

		const getEncounter = async () => {
			const encounteredPokemon = await getPokemon(activeEncounter)

			setActivePokemon(encounteredPokemon)
		}

		getEncounter()

	}, [activeEncounter])



	const handleBroadcastMessage = (message: MessageEvent) => {
		try {
			const { name } = schema.parse(message.data);

			setEncounter(name);
		} catch (_) {
			console.error('Invalid broadcasting data');
		}
	};

	useEffect(() => {
		syncChannel.addEventListener(channelListenerName, handleBroadcastMessage);

		return () => {
			syncChannel.removeEventListener(channelListenerName, handleBroadcastMessage);
		};
	}, []);

	if (!activePokemon) {
		return <></>;
	}

	const { pokemon } = activePokemon;

	return (
		<div className='mb-8'>
			<div className='flex flex-col items-center'>
				<img
					src={pokemon.sprites.front_default}
					width={150}
					height={150}
				/>
			</div>
			<article className='prose lg:prose-lg prose-headings:mb-0 prose-p:mt-4'>
				<h1 className='capitalize'>
					{pokemon.name}
				</h1>
			</article>
		</div>
	);
}

export default Encounter;
