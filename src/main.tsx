import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import { fetchGeneration } from "./data/generation";
import Pokedex from "./pages/Pokedex";
import World from "./pages/World";

import "./index.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	},
});

const persister = createSyncStoragePersister({
	storage: window.localStorage,
});

const router = createBrowserRouter([
	{
		id: "root",
		path: "/",
		element: <RootLayout />,
		loader: () => fetchGeneration(),
		children: [
			{
				index: true,
				element: <World />,
			},
			{
				path: "pokedex",
				element: <Pokedex />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</PersistQueryClientProvider>
	</React.StrictMode>
);
