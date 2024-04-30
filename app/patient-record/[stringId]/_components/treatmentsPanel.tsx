"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { ClinicalRecord, TreatmentRecord } from "@/lib/types";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/dataTable";
import { treatmentColumns } from "@/components/columns/treatmentColumns";
import TreatmentsAddModal from "./treatmentsAddModal";

type Props = {
    treatmentRecords: TreatmentRecord[];
    clinicalRecords: ClinicalRecord[];
};

export default function TreatmentsPanel(props: Props) {
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
                    <TreatmentsAddModal
                        clinicalRecords={props.clinicalRecords}
                    />
                </div>
            </div>
            <DataTable
                data={props.treatmentRecords}
                columns={treatmentColumns}
                pageSize={5}
                onRowSelectionChange={onRowSelectionChange}
            />
        </div>
    );
}
