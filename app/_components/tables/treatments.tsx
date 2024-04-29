"use client";

import { useEffect, useState } from "react";
import {
    RowSelectionState,
    SortingState,
    flexRender,
    getCoreRowModel,
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
import { Treatment } from "@/lib/types";
import { columns } from "../columnDefs/treatment";
import TableFooter from "./tableFooter";

export function TreatmentsTable({
    data,
    onRowSelectionChange,
}: {
    data: Treatment[];
    onRowSelectionChange: (state: RowSelectionState) => void;
}) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const table = useReactTable({
        data,
        columns,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    useEffect(() => {
        onRowSelectionChange(rowSelection);
    }, [rowSelection, onRowSelectionChange]);

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
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Записи не найдены.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TableFooter table={table} />
        </div>
    );
}
