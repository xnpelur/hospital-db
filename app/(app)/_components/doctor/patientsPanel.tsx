"use client";

import { DataTable } from "@/components/dataTable";
import { getColumnDefs } from "@/lib/columnDefs";
import { PatientRecord, SimplifiedColumnDef } from "@/lib/types";

type Props = {
    data: PatientRecord[];
    columns: SimplifiedColumnDef[];
};

export default function PatientsPanel(props: Props) {
    return (
        <div className="flex flex-1 pt-6">
            <DataTable
                data={props.data}
                columnDefs={getColumnDefs("patient", props.columns, false)}
                pageSize={10}
                rowUrl="/patient-record"
            />
        </div>
    );
}
