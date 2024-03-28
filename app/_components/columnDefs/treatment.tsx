"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Treatment } from "@/lib/types";

function toDateString(date: Date): string {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export const columns: ColumnDef<Treatment>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
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
];
