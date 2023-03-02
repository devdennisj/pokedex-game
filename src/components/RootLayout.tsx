import { Link, Outlet } from 'react-router-dom';
import { routes } from '../pages/config';
import Notifications from '../features/Notifications';

function RootLayout() {
  return (
    <div>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <ul tabIndex={0} className='menu menu-horizontal px-1 gap-4'>
            <li>
              <Link to={routes.pokedex.path}>Pokedex</Link>
            </li>
            <li>
              <a>Quests</a>
            </li>
          </ul>
        </div>
        <div className='navbar-center'>
          <Link
            to={`/${routes.game.path}`}
            className='btn btn-ghost text-xl uppercase'
          >
            Pokecatcher
          </Link>
        </div>
        <div className='navbar-end'>
          <Notifications />
        </div>
      </div>
      <div className='pt-32'>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
