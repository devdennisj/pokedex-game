import { Link } from 'react-router-dom';
import { routes } from '../../pages/config';
import Notifications from '../../features/Notifications';

function Header() {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <ul tabIndex={0} className='menu menu-horizontal px-1 gap-4'>
          <li>
            <Link to={routes.pokedex.path}>Pokedex</Link>
          </li>
          <li>
            <Link to={routes.quests.path}>Quests</Link>
          </li>
          <li>
            <Link to={`/${routes.game.path}`}>World</Link>
          </li>
          <li>
            <Link to={routes.town.path}>Town</Link>
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
  );
}

export default Header;
