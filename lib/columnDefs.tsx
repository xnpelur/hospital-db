import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { SimplifiedColumnDef, WithDependencies } from "./types";
import { Button } from "@/components/ui/button";
import {
    CaretDownIcon,
    CaretSortIcon,
    CaretUpIcon,
} from "@radix-ui/react-icons";
import { toLocalizedString } from "./dates";
import ActionsDropdown from "@/components/actionsDropdown";

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
                    {col.type == "date"
                        ? toLocalizedString(row.getValue(col.key))
                        : row.getValue(col.key)}
                </div>
            ),
        });
    });

    if (editable) {
        columnDefs.unshift({
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                    className="ml-2 border-gray-700"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="ml-2"
                />
            ),
            size: 46,
            enableSorting: false,
            enableHiding: false,
        });

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
