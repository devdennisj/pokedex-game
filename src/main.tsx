import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RootLayout from "./components/RootLayout";
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<RootLayout />}>
						<Route index element={<World />} />
						<Route path="pokedex" element={<Pokedex />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</PersistQueryClientProvider>
	</React.StrictMode>
);
