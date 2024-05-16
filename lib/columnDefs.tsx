import { ColumnDef } from "@tanstack/react-table";
import {
    ClinicalRecord,
    SimplifiedColumnDef,
    TreatmentRecord,
    WithDependencies,
} from "./types";
import { Button } from "@/components/ui/button";
import {
    CaretDownIcon,
    CaretSortIcon,
    CaretUpIcon,
} from "@radix-ui/react-icons";
import { toLocalizedString } from "./dates";
import ActionsDropdown from "@/components/actionsDropdown";
import TreatmentRecordActionsDropdown from "@/app/(app)/patient-record/[stringId]/_components/actionsDropdown";

function patientStatusBadge(value: string) {
    return (
        <span
            className={
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
                (value == "На лечении"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800")
            }
        >
            {value}
        </span>
    );
}

export function getColumnDefs(
    tableName: string,
    columns: SimplifiedColumnDef[],
    editable: boolean
) {
    const columnDefs: ColumnDef<WithDependencies>[] = [];

    columns.forEach((col) => {
        columnDefs.push({
            accessorKey: col.key,
            header: col.sortable
                ? ({ column }) => {
                      return (
                          <Button
                              variant="ghost"
                              onClick={() =>
                                  column.toggleSorting(
                                      column.getIsSorted() === "asc"
                                  )
                              }
                              className="px-0 font-inherit hover:bg-inherit"
                          >
                              <span>{col.title}</span>
                              {column.getIsSorted() === "desc" ? (
                                  <CaretDownIcon className="ml-2 h-4 w-4" />
                              ) : column.getIsSorted() === "asc" ? (
                                  <CaretUpIcon className="ml-2 h-4 w-4" />
                              ) : (
                                  <CaretSortIcon className="ml-2 h-4 w-4" />
                              )}
                          </Button>
                      );
                  }
                : col.title,
            cell: ({ row }) => (
                <div>
                    {col.type === "date"
                        ? toLocalizedString(row.getValue(col.key))
                        : col.type === "patient_badge"
                          ? patientStatusBadge(row.getValue(col.key))
                          : row.getValue(col.key)}
                </div>
            ),
        });
    });

    if (editable) {
        columnDefs.push({
            id: "actions",
            enableHiding: false,
            size: 60,
            cell: ({ row }) => {
                return (
                    <ActionsDropdown
                        tableName={tableName}
                        row={row.original}
                        dependencies={row.original.dependencies}
                        columns={columns}
                    />
                );
            },
        });
    }

    return columnDefs;
}

export function getTreatmentRecordsColumnDefs(
    columns: SimplifiedColumnDef[],
    clinicalRecords: ClinicalRecord[],
    editable: boolean
) {
    const columnDefs: ColumnDef<WithDependencies>[] = [];

    columns.forEach((col) => {
        columnDefs.push({
            accessorKey: col.key,
            header: col.sortable
                ? ({ column }) => {
                      return (
                          <Button
                              variant="ghost"
                              onClick={() =>
                                  column.toggleSorting(
                                      column.getIsSorted() === "asc"
                                  )
                              }
                              className="px-0 font-inherit hover:bg-inherit"
                          >
                              <span>{col.title}</span>
                              {column.getIsSorted() === "desc" ? (
                                  <CaretDownIcon className="ml-2 h-4 w-4" />
                              ) : column.getIsSorted() === "asc" ? (
                                  <CaretUpIcon className="ml-2 h-4 w-4" />
                              ) : (
                                  <CaretSortIcon className="ml-2 h-4 w-4" />
                              )}
                          </Button>
                      );
                  }
                : col.title,
            cell: ({ row }) => (
                <div>
                    {col.type === "date"
                        ? toLocalizedString(row.getValue(col.key))
                        : col.type === "patient_badge"
                          ? patientStatusBadge(row.getValue(col.key))
                          : row.getValue(col.key)}
                </div>
            ),
        });
    });

    if (editable) {
        columnDefs.push({
            id: "actions",
            enableHiding: false,
            size: 60,
            cell: ({ row }) => {
                return (
                    <TreatmentRecordActionsDropdown
                        treatmentRecord={row.original as TreatmentRecord}
                        clinicalRecords={clinicalRecords}
                    />
                );
            },
        });
    }

    return columnDefs;
}
