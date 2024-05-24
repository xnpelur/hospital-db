"use client";

import {
    ClinicalRecord,
    SimplifiedColumnDef,
    TreatmentRecord,
} from "@/lib/types";
import { DataTable } from "@/components/dataTable";
import TreatmentRecordAddModal from "./treatmentRecordAddModal";
import { getTreatmentRecordsColumnDefs } from "@/lib/columnDefs";

type Props = {
    treatmentRecords: TreatmentRecord[];
    clinicalRecords: ClinicalRecord[];
    editable: boolean;
    columns: SimplifiedColumnDef[];
};

export default function TreatmentRecordsPanel(props: Props) {
    return (
        <div className="flex flex-col space-y-5">
            <div className="flex justify-between gap-2">
                <h2 className="mx-1 text-2xl font-semibold">Процедуры</h2>
                {props.editable ? (
                    <div className="space-x-4">
                        <TreatmentRecordAddModal
                            clinicalRecords={props.clinicalRecords}
                        />
                    </div>
                ) : null}
            </div>
            <DataTable
                data={props.treatmentRecords}
                columnDefs={getTreatmentRecordsColumnDefs(
                    props.columns,
                    props.clinicalRecords,
                    props.editable
                )}
                pageSize={5}
            />
        </div>
    );
}
