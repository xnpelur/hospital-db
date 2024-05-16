"use client";

import { ClinicalRecord, TreatmentRecord } from "@/lib/types";
import { DataTable } from "@/components/dataTable";
import { getTreatmentRecordColumns } from "@/components/columns/treatmentRecordColumns";
import TreatmentsAddModal from "./treatmentsAddModal";

type Props = {
    treatmentRecords: TreatmentRecord[];
    clinicalRecords: ClinicalRecord[];
    editable: boolean;
};

export default function TreatmentsPanel(props: Props) {
    return (
        <div className="flex flex-col space-y-5">
            <div className="flex justify-between gap-2">
                <h2 className="mx-1 text-2xl font-semibold">Процедуры</h2>
                {props.editable ? (
                    <div className="space-x-4">
                        <TreatmentsAddModal
                            clinicalRecords={props.clinicalRecords}
                        />
                    </div>
                ) : null}
            </div>
            <DataTable
                data={props.treatmentRecords}
                columnDefs={getTreatmentRecordColumns(
                    props.clinicalRecords,
                    props.editable
                )}
                pageSize={5}
            />
        </div>
    );
}
