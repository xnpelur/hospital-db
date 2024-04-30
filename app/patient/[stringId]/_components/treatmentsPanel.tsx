"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { Disease, Treatment } from "@/lib/types";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/dataTable";
import { useRouter } from "next/navigation";
import { treatmentColumns } from "@/components/columns/treatmentColumns";
import TreatmentsAddModal from "./treatmentsAddModal";

type Props = {
    treatments: Treatment[];
    diseases: Disease[];
};

export default function TreatmentsPanel(props: Props) {
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const router = useRouter();

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
        <div className="flex flex-col space-y-5">
            <div className="flex justify-between gap-2">
                <h2 className="mx-1 text-2xl font-semibold">Процедуры</h2>
                <div className="space-x-4">
                    {showDeleteButton ? (
                        <Button variant="destructive">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Удалить выбранные записи
                        </Button>
                    ) : null}
                    <TreatmentsAddModal diseases={props.diseases} />
                </div>
            </div>
            <DataTable
                data={props.treatments}
                columns={treatmentColumns}
                pageSize={5}
                onRowSelectionChange={onRowSelectionChange}
            />
        </div>
    );
}
