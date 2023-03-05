import { useRouteLoaderData } from 'react-router-dom';

import { GenerationPokemon } from '../../data/generation';
import { useChannelStore } from '../../stores/channels';
import { useGameStateStore } from '../../stores/game_state';
import { usePokedexStore } from '../../stores/pokemon';

import Encounter from './features/Encounter';
import { routes } from '../config';

type RouterData = GenerationPokemon[] | undefined;

function World() {
  const generationData =
    (useRouteLoaderData(routes.game.id ?? '') as RouterData) ?? [];

  const syncChannel = useChannelStore((state) => state.channels.pokemonSync);
  const setEncounter = useGameStateStore((state) => state.setEncounter);
  const activeEncounter = useGameStateStore((state) => state.activeEncounter);
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

    getPokemon(name);
    setNextEncounter(idx);
  };

  return (
    <div className='container mx-auto flex flex-col items-center'>
      <div className='min-h-[230px]'>
        <Encounter />
      </div>
      <div className='flex pt-4'>
        <div className='grid place-items-center h-20'>
          <button
            className='btn btn-primary'
            onClick={generateEncounter}
            onMouseEnter={handleOnHover}
          >
            {activeEncounter ? 'Continue' : 'Into the wilds'}
          </button>
        </div>
        <div className='divider divider-horizontal'>OR</div>
        <div className='grid place-items-center h-20'>
          <button disabled className='btn btn-outline'>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default World;
