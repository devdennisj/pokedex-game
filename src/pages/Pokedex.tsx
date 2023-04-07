import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { useRouteLoaderData } from 'react-router-dom';
import { memo, useCallback } from 'react';

import { GenerationPokemon } from '../data/generation';
import { FoundPokemon, MetaData, usePokedexStore } from '../stores/pokemon';
import { Pokemon } from '../data/pokemon';

import { routes } from './config';

export interface TablePokemon {
  pokemon: Partial<Pokemon>;
  metaData?: Partial<MetaData>;
}

const columnHelper = createColumnHelper<TablePokemon>();

const columns = [
  columnHelper.accessor('pokemon.sprites.front_default', {
    header: 'Sprite',
    maxSize: 15,
    size: 15,
    cell: ({ getValue }) => {
      const value = getValue();

      return value ? <img src={value} /> : '-';
    },
  }),
  columnHelper.accessor('pokemon.name', {
    header: 'Name',
  }),
  columnHelper.accessor('metaData.added', {
    header: 'Added',
    cell: ({ getValue }) => {
      const value = getValue();

      return <>{value ?? '-'}</>;
    },
  }),
];

type RouterData = GenerationPokemon[] | undefined;

const combineData = (
  generationData: GenerationPokemon[],
  collected: FoundPokemon[]
) => {
  const pokedexData = generationData.map((entry) => {
    const idx = collected.findIndex(
      ({ pokemon }) => pokemon.name === entry.name
    );

    if (idx === -1) {
      const completeData: TablePokemon = {
        pokemon: {
          name: entry.name,
        },
      };

      return completeData;
    } else {
      const collectedPokemon: TablePokemon = collected[idx];

      return {
        ...collectedPokemon,
      };
    }
  });
  return pokedexData;
};

function Pokedex() {
  const generationData =
    (useRouteLoaderData(routes.game.path || '') as RouterData) ?? [];
  const collected = usePokedexStore((state) => state.collected);

  const combinedData = combineData(generationData, collected);

  const table = useReactTable({
    columns,
    data: combinedData,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const headers = useCallback(
    () =>
      table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              className='relative'
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
                    'resizer',
                    `${header.column.getIsResizing() ? 'isResizing' : ''}`,
                  ])}
                />
              )}
            </th>
          ))}
        </tr>
      )),
    [table]
  );

  return (
    <div className='p-4'>
      <table className='table w-full border-none'>
        <thead>{headers()}</thead>
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

export default memo(Pokedex);
