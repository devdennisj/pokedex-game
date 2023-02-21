import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import { fetchGeneration } from "../data/generation";
import World from "./World";
import Pokedex from "./Pokedex";

export const routes = { root: "root" }

export const router = createBrowserRouter([
  {
    id: routes.root,
    path: '/',
    element: <RootLayout />,
    loader: () => fetchGeneration(),
    children: [
      {
        index: true,
        element: <World />,
      },
      {
        path: 'pokedex',
        element: <Pokedex />,
      },
    ],
  },
]);
