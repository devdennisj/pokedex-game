import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useRouteLoaderData } from "react-router-dom";

import { GenerationPokemon } from "../data/generation";

const columnHelper = createColumnHelper<GenerationPokemon>();

const columns = [
	columnHelper.accessor("name", {
		header: "Name",
	}),
];

function Pokedex() {
	const generationData = useRouteLoaderData("root") as GenerationPokemon[];

	const table = useReactTable({
		columns,
		data: generationData,
		columnResizeMode: "onChange",
		enableColumnResizing: true,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			<table className='table w-full border-none'>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									className="relative"
									style={{ width: header.getSize() }}
								>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									{header.column.getCanResize() && (
										<div
											onMouseDown={header.getResizeHandler()}
											onTouchStart={header.getResizeHandler()}
											className={classNames([
												"resizer",
												`${header.column.getIsResizing() ? "isResizing" : ""}`
											])}
										/>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Pokedex;
