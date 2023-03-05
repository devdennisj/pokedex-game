import { useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

import { usePokedexStore } from '../stores/pokemon';
import { Bell } from '../components/Icons';

dayjs.extend(relativeTime);

function Notifications() {
  const [hasNotifications, setHasNotifications] = useState(false);
  const collected = usePokedexStore((state) => state.collected);

  useEffect(() => {
    const listLength = collected.length;
    if (collected.length === 0) return;

    const latestPokemon = collected[listLength - 1];

    toast.custom((t) => (
      <div className='flex justify-end animate-enter'>
        <div className='stat shadow-md bg-base-200 min-w-[250px]'>
          <div className='stat-value capitalize'>
            {latestPokemon.pokemon.name}
          </div>
          <div className='stat-desc'>has been added</div>
        </div>
      </div>
    ));

    setHasNotifications(true);
  }, [collected]);

  return (
    <>
      <div className='dropdown dropdown-end'>
        <label tabIndex={0}>
          <button
            className='btn btn-ghost btn-circle'
            onMouseEnter={() => toast.remove()}
            onClick={() => setHasNotifications(false)}
          >
            <div className='indicator'>
              <Bell />
              {hasNotifications && (
                <span className='badge badge-xs badge-primary indicator-item'></span>
              )}
            </div>
          </button>
        </label>
        <ul
          tabIndex={0}
          className='menu dropdown-content shadow-md bg-base-200 min-w-[250px] mt-1 mr-3'
        >
          {collected.slice(-5).map(({ pokemon, metaData }) => (
            <li key={pokemon.name + metaData.added.toString()}>
              <div className='stat'>
                <div className='stat-value capitalize'>{pokemon.name}</div>
                <div className='stat-desc'>
                  {dayjs(metaData.added).fromNow()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Notifications;
