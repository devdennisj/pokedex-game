import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/RootLayout';
import { fetchGeneration } from './data/generation';
import World from './pages/World';

const Pokedex = lazy(() => import('./pages/Pokedex'));

import './index.css';

const router = createBrowserRouter([
	{
		id: 'root',
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
