import { Button } from "@/components/ui/button";
import { Patient, Treatment } from "@/lib/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Table as TanstackTable } from "@tanstack/react-table";
import { useMemo } from "react";

type Props = {
    table: TanstackTable<Patient> | TanstackTable<Treatment>;
};

export default function TableFooter(props: Props) {
    const { pageIndex, pageSize } = props.table.getState().pagination;
    const rowsCount = props.table.getFilteredRowModel().rows.length;

    const rowsShownString = useMemo(() => {
        const startRow = rowsCount != 0 ? pageIndex * pageSize + 1 : 0;
        const endRow = Math.min((pageIndex + 1) * pageSize, rowsCount);

        return `${startRow} - ${endRow} из ${rowsCount}`;
    }, [pageIndex, pageSize, rowsCount]);

    return (
        <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
                {rowsShownString}
            </div>
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => props.table.previousPage()}
                    disabled={!props.table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => props.table.nextPage()}
                    disabled={!props.table.getCanNextPage()}
                >
                    <ChevronRightIcon />
                </Button>
            </div>
        </div>
    );
}
