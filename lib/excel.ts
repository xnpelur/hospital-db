import writeXlsxFile from "write-excel-file";
import { SimplifiedColumnDef } from "./types";
import { toLocalizedString } from "./dates";

export async function writeToExcel(
    data: any[],
    columns: SimplifiedColumnDef[]
) {
    const rows: Object[][] = [
        columns.map((column) => ({
            value: column.title,
            fontWeight: "bold",
        })),
    ];
    data.forEach((dataRow) => {
        rows.push(
            columns.map((column) => ({
                value:
                    column.type === "date"
                        ? toLocalizedString(dataRow[column.key])
                        : dataRow[column.key],
            }))
        );
    });
    await writeXlsxFile(rows, {
        fileName: "report.xlsx",
    });
}
