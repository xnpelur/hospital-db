"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Treatment } from "@/lib/types";
import { Checkbox } from "../ui/checkbox";

export function getTreatmentColumns(editable: boolean): ColumnDef<Treatment>[] {
    const columns: ColumnDef<Treatment>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                    className="ml-2 border-gray-700"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="ml-2"
                />
            ),
            size: 46,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="font-inherit"
                    >
                        Название процедуры
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue("title")}</div>,
        },
        {
            accessorKey: "cost",
            header: "Стоимость процедуры",
            cell: ({ row }) => <div>{row.getValue("cost")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            size: 60,
            cell: ({ row }) => {
                return (
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                );
            },
        },
    ];

    return editable ? columns : columns.slice(1, -1);
}
