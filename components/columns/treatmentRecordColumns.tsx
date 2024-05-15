"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ClinicalRecord, TreatmentRecord } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { toLocalizedString } from "@/lib/dates";
import ActionsDropdown from "@/app/(app)/patient-record/[stringId]/_components/actionsDropdown";

export function getTreatmentRecordColumns(
    clinicalRecords: ClinicalRecord[],
    editable: boolean
): ColumnDef<TreatmentRecord>[] {
    const columns: ColumnDef<TreatmentRecord>[] = [
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
            accessorKey: "start_date",
            header: "Дата начала",
            cell: ({ row }) => (
                <div>{toLocalizedString(row.getValue("start_date"))}</div>
            ),
        },
        {
            accessorKey: "end_date",
            header: "Дата окончания",
            cell: ({ row }) => (
                <div>{toLocalizedString(row.getValue("end_date"))}</div>
            ),
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
                    <ActionsDropdown
                        clinicalRecords={clinicalRecords}
                        treatmentRecord={row.original}
                    />
                );
            },
        },
    ];

    return editable ? columns : columns.slice(1, -1);
}
