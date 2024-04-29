"use client";

import * as React from "react";
import {
    CaretSortIcon,
    DotsHorizontalIcon,
    Pencil1Icon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Treatment } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function toDateString(date: Date): string {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export const columns: ColumnDef<Treatment>[] = [
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
                    Процедура
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "cost",
        header: "Стоимость",
        cell: ({ row }) => <div>{row.getValue("cost")}</div>,
    },
    {
        accessorKey: "start_date",
        header: "Дата начала",
        cell: ({ row }) => (
            <div>{toDateString(row.getValue("start_date"))}</div>
        ),
    },
    {
        accessorKey: "end_date",
        header: "Дата окончания",
        cell: ({ row }) => <div>{toDateString(row.getValue("end_date"))}</div>,
    },
    {
        accessorKey: "repeat_interval",
        header: "Интервал повторения",
        cell: ({ row }) => <div>{row.getValue("repeat_interval")}</div>,
    },
    {
        accessorKey: "disease",
        header: "Болезнь",
        cell: ({ row }) => <div>{row.getValue("disease")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        size: 60,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Открыть меню</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem>
                            <Pencil1Icon className="mr-2 h-4 w-4" />
                            Изменить
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Удалить
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
