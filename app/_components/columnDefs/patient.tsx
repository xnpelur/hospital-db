"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Patient } from "@/lib/types";

function toDateString(date: Date): string {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export const columns: ColumnDef<Patient>[] = [
    {
        accessorKey: "full_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ФИО
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
    },
    {
        accessorKey: "birth_date",
        header: "Дата рождения",
        cell: ({ row }) => (
            <div>{toDateString(row.getValue("birth_date") as Date)}</div>
        ),
    },
    {
        accessorKey: "social_status",
        header: "Социальный статус",
        cell: ({ row }) => <div>{row.getValue("social_status")}</div>,
    },
    {
        accessorKey: "admission_date",
        header: "Дата поступления",
        cell: ({ row }) => (
            <div>{toDateString(row.getValue("admission_date") as Date)}</div>
        ),
    },
    {
        accessorKey: "discharge_date",
        header: "Дата выписки",
        cell: ({ row }) => (
            <div>{toDateString(row.getValue("discharge_date") as Date)}</div>
        ),
    },
];
