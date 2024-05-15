"use client";

import { useEffect, useMemo, useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    RowSelectionState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

type Props = {
    data: any[];
    columnDefs: ColumnDef<any, any>[];
    pageSize: number;
    onRowSelectionChange?: (state: RowSelectionState) => void;
    rowUrl?: string;
    filter?: {
        key: string;
        value: string;
    };
};

export function DataTable(props: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const router = useRouter();

    const table = useReactTable({
        data: props.data,
        columns: props.columnDefs,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            rowSelection,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: props.pageSize,
            },
        },
    });

    const { pageIndex, pageSize } = table.getState().pagination;
    const rowsCount = table.getFilteredRowModel().rows.length;

    const rowsShownString = useMemo(() => {
        const startRow = rowsCount != 0 ? pageIndex * pageSize + 1 : 0;
        const endRow = Math.min((pageIndex + 1) * pageSize, rowsCount);

        return `${startRow} - ${endRow} из ${rowsCount}`;
    }, [pageIndex, pageSize, rowsCount]);

    const onRowSelectionChange = props.onRowSelectionChange;

    useEffect(() => {
        onRowSelectionChange?.(rowSelection);
    }, [rowSelection, onRowSelectionChange]);

    useEffect(() => {
        if (props.filter) {
            table
                .getColumn(props.filter.key)
                ?.setFilterValue(props.filter.value);
        }
        console.log("filter or table changed");
    }, [props.filter, table]);

    return (
        <div className="flex w-full flex-1 flex-col justify-between">
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-gray-200 text-gray-700">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="font-bold"
                                            style={{
                                                width:
                                                    header.getSize() !== 150
                                                        ? header.getSize()
                                                        : undefined,
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={i}
                                    className="h-12 cursor-pointer"
                                    onClick={() => {
                                        if (props.rowUrl) {
                                            router.push(
                                                `${props.rowUrl}/${row.original.id}`
                                            );
                                        }
                                    }}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={props.columnDefs.length}
                                    className="h-24 text-center"
                                >
                                    Записи не найдены.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                    {rowsShownString}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}
