import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/RootLayout";
import { fetchGeneration } from "../data/generation";

import World from "./World";
import Pokedex from "./Pokedex";
import StartPage from "./StartPage";
import { routes } from "./config";


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
    ],
  },
]);
