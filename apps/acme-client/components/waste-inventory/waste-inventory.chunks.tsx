'use client'

import { WasteInventory } from '@acme/acme-db/types'
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
import { WasteInventoryEditButton } from './waste-inventory'
import { useWasteInventoryMutations } from './waste-inventory-create'

type WasteInventoryTableProps = {
  data: WasteInventory[]
  isLoading: boolean
}

export function WasteInventoryTable({ data, isLoading }: WasteInventoryTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const { deleteMutation } = useWasteInventoryMutations()

  const columns = React.useMemo<ColumnDef<WasteInventory>[]>(
    () => [
      {
        accessorKey: 'waste_type',
        cell: ({ row }) => (
          <div className="font-medium capitalize">{(row.getValue('waste_type') as string).replace('_', ' ')}</div>
        ),
        header: 'Waste Type',
      },
      {
        accessorKey: 'quantity_kg',
        cell: ({ row }) => <div>{row.getValue('quantity_kg') as string} kg</div>,
        header: 'Quantity',
      },
      {
        accessorKey: 'location',
        cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue('location') as string}</div>,
        header: 'Location',
      },
      {
        accessorKey: 'quality_grade',
        cell: ({ row }) => {
          const grade = row.getValue('quality_grade') as string
          const colorClass =
            {
              degraded: 'text-red-600',
              pristine: 'text-green-600',
              standard: 'text-yellow-600',
            }[grade] || 'text-gray-600'
          return <div className={`capitalize ${colorClass}`}>{grade}</div>
        },
        header: 'Quality',
      },
      {
        accessorKey: 'contamination_level',
        cell: ({ row }) => {
          const level = row.getValue('contamination_level') as number
          return <div>{(level * 100).toFixed(1)}%</div>
        },
        header: 'Contamination',
      },
      {
        accessorKey: 'date_collected',
        cell: ({ row }) => new Date(row.getValue('date_collected') as string).toLocaleDateString(),
        header: 'Collected',
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
                  <WasteInventoryEditButton data={material} />
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
          placeholder="Search Inventory..."
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
                  No Inventory found.
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
