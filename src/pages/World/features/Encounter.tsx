import { useEffect } from 'react';

import { getPokemonSchema } from '../../../data/pokemon';
import { useChannelStore } from '../../../stores/channels';
import { useGameStateStore } from '../../../stores/game_state';
import { usePokedexStore } from '../../../stores/pokemon';

const schema = getPokemonSchema();

function Encounter() {
	const syncChannel = useChannelStore((state) => state.channels.pokemonSync);
	const activeEncounter = useGameStateStore((state) => state.activeEncounter);
	const setEncounter = useGameStateStore((state) => state.setEncounter);
	const collectedPokemon = usePokedexStore((state) => state.collected);

	const idx = collectedPokemon.findIndex(
		({ pokemon }) => pokemon.name === activeEncounter
	);
	const activePokemon = collectedPokemon[idx];

	const handleBroadcastMessage = (message: MessageEvent) => {
		try {
			const { name } = schema.parse(message.data);

			setEncounter(name);
		} catch (_) {
			console.error('Invalid broadcasting data');
		}
	};

	useEffect(() => {
		syncChannel.addEventListener('message', handleBroadcastMessage);

		return () => {
			syncChannel.removeEventListener('message', handleBroadcastMessage);
		};
	}, []);

	if (!activePokemon) {
		return <></>;
	}

	const { pokemon } = activePokemon;

	return (
		<div>
			<div className='flex flex-col items-center'>
				<img
					src={pokemon.sprites.front_default}
					width={150}
					height={150}
				/>
			</div>
			<article className='prose lg:prose-lg prose-headings:mb-0 prose-p:mt-4'>
				<h1 className='capitalize text-[#454545]'>
					{pokemon.name}
				</h1>
			</article>
		</div>
	);
}

export default Encounter;
