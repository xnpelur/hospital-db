import { useMemo } from "react";
import { Table as TanstackTable } from "@tanstack/react-table";
import { Patient, Treatment } from "@/lib/types";

export default function TableRowsShownInfo({
    table,
}: {
    table: TanstackTable<Patient> | TanstackTable<Treatment>;
}) {
    const { pageIndex, pageSize } = table.getState().pagination;
    const rowsCount = table.getFilteredRowModel().rows.length;

    const rowsShownString = useMemo(() => {
        const startRow = rowsCount != 0 ? pageIndex * pageSize + 1 : 0;
        const endRow = Math.min((pageIndex + 1) * pageSize, rowsCount);

        return `${startRow} - ${endRow} из ${rowsCount}`;
    }, [pageIndex, pageSize, rowsCount]);

    return (
        <div className="text-sm text-muted-foreground">{rowsShownString}</div>
    );
}
