import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../components/RootLayout/RootLayout';
import { fetchGeneration } from '../data/generation';

import World from './World';
import Pokedex from './Pokedex';
import StartPage from './StartPage';
import { routes } from './config';
import Quests from './Quests';
import Town from './Town';

import NPC from '../features/NPC';

export const router = createBrowserRouter([
  {
    path: routes.root.path,
    element: <StartPage />,
  },
  {
    id: routes.game.id,
    path: routes.game.path,
    element: <RootLayout />,
    loader: () => fetchGeneration(),
    children: [
      {
        index: true,
        element: <World />,
      },
      {
        path: routes.pokedex.path,
        element: <Pokedex />,
      },
      {
        path: routes.quests.path,
        element: <Quests />,
      },
      {
        path: routes.town.path,
        element: <Town />,
      },
      {
        path: routes.npc.path,
        element: <NPC />,
      },
    ],
  },
]);
