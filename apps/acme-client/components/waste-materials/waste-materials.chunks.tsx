'use client'

import { WasteMaterial } from '@acme/acme-db/types'
import { Button } from '@acme/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@acme/ui/dropdown-menu'
import { Input } from '@acme/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@acme/ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import * as React from 'react'
import { WasteMaterialsEditButton } from './waste-materials'
import { useWasteMaterialsMutations } from './waste-materials-create'

type WasteMaterialsTableProps = {
  data: WasteMaterial[]
  isLoading: boolean
}

export function WasteMaterialsTable({ data, isLoading }: WasteMaterialsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const { deleteMutation } = useWasteMaterialsMutations()

  const columns = React.useMemo<ColumnDef<WasteMaterial>[]>(
    () => [
      {
        accessorKey: 'name',
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
        header: 'Name',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'description',
        cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue('description')}</div>,
        header: 'Description',
      },
      {
        accessorKey: 'density_kg_per_m3',
        header: 'Density (kg/m³)',
      },
      {
        accessorKey: 'processing_difficulty',
        header: 'Difficulty',
      },
      {
        accessorKey: 'recyclability_score',
        header: 'Recyclability',
      },
      {
        accessorKey: 'created_at',
        cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
        header: 'Created At',
      },
      {
        cell: ({ row }) => {
          const material = row.original
          return (
            <DropdownMenu placement="bottom-end">
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8 p-0" variant="ghost">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <WasteMaterialsEditButton id={material.id} />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteMutation.mutate(material.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
        header: 'Actions',
        id: 'actions',
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: { globalFilter, sorting },
  })

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="flex items-center justify-between">
        <Input
          className="max-w-sm"
          onChange={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search materials..."
          value={globalFilter ?? ''}
        />
      </div>

      <div className="rounded-2xl border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="cursor-pointer select-none"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-2" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No materials found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} size="sm" variant="outline">
          Previous
        </Button>
        <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} size="sm" variant="outline">
          Next
        </Button>
      </div>
    </div>
  )
}
