"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/dataTable";
import { getColumnDefs } from "@/lib/columnDefs";
import AddRowModal from "./modals/addRowModal";
import { SimplifiedColumnDef } from "@/lib/types";

type Props = {
    title: string;
    data: any[];
    columns: SimplifiedColumnDef[];
    editable: boolean;
    pageSize: number;
    tableName: string;
};

export default function TablePanel(props: Props) {
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    function onRowSelectionChange(state: RowSelectionState) {
        for (const key in state) {
            if (state[key]) {
                setShowDeleteButton(true);
                return;
            }
        }
        setShowDeleteButton(false);
    }

    return (
        <div className="flex h-full flex-col space-y-5">
            <div className="flex justify-between gap-2">
                <h2 className="mx-1 text-2xl font-semibold">{props.title}</h2>
                {props.editable ? (
                    <div className="space-x-4">
                        {showDeleteButton ? (
                            <Button variant="destructive">
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Удалить выбранные записи
                            </Button>
                        ) : null}
                        <AddRowModal
                            tableName={props.tableName}
                            columns={props.columns}
                        />
                    </div>
                ) : null}
            </div>
            <DataTable
                data={props.data}
                columnDefs={getColumnDefs(
                    props.tableName,
                    props.columns,
                    props.editable
                )}
                pageSize={props.pageSize}
                onRowSelectionChange={onRowSelectionChange}
            />
        </div>
    );
}
