"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/dataTable";
import { getColumnDefs } from "@/lib/columnDefs";
import AddRowModal from "./modals/addRowModal";
import { SimplifiedColumnDef } from "@/lib/types";
import { Input } from "./ui/input";

type Props = {
    title: string;
    data: any[];
    columns: SimplifiedColumnDef[];
    editable: boolean;
    pageSize: number;
    tableName: string;
};

export default function TablePanel(props: Props) {
    const [filterString, setFilterString] = useState("");

    return (
        <div className="flex h-full flex-col space-y-5">
            <div className="flex justify-between gap-4">
                <h2 className="mx-1 text-2xl font-semibold">{props.title}</h2>
                <div className="min-w-sm flex w-96 items-center">
                    <Input
                        placeholder="Поиск..."
                        value={filterString}
                        onChange={(event) =>
                            setFilterString(event.target.value)
                        }
                        className="w-full"
                    />
                </div>
                <div>
                    {props.editable ? (
                        <div className="space-x-4">
                            <AddRowModal
                                tableName={props.tableName}
                                columns={props.columns}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
            <DataTable
                data={props.data}
                columnDefs={getColumnDefs(
                    props.tableName,
                    props.columns,
                    props.editable
                )}
                pageSize={props.pageSize}
                filter={
                    props.columns?.length
                        ? { key: props.columns[0].key, value: filterString }
                        : undefined
                }
            />
        </div>
    );
}
