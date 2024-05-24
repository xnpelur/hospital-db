"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DataTable } from "@/components/dataTable";
import { getColumnDefs } from "@/lib/columnDefs";
import { SimplifiedColumnDef } from "@/lib/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { runFunction } from "@/lib/db";
import { writeToExcel } from "@/lib/excel";
import QueryChartDialog from "./queryChartDialog";

type Props = {
    title: string;
    functionName: string;
    columns: SimplifiedColumnDef[];
    pageSize: number;
    withParameter: boolean;
};

export default function QueryTablePanel(props: Props) {
    const [parameter, setParameter] = useState("");
    const [data, setData] = useState<any[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const fetchData = useCallback(
        async (params: any[]) => {
            const temp = await runFunction<any>(props.functionName, params);
            setData(temp);
        },
        [props.functionName]
    );

    useEffect(() => {
        if (!props.withParameter) {
            fetchData([]);
        }
    }, [props.withParameter, fetchData]);

    return (
        <div className="flex h-full flex-col space-y-5">
            <div className="flex justify-between gap-4">
                <h2 className="mx-1 text-2xl font-semibold">{props.title}</h2>
                {props.withParameter && (
                    <div className="min-w-sm flex w-1/3 items-center justify-between gap-4">
                        <Input
                            ref={inputRef}
                            placeholder="Введите параметр"
                            value={parameter}
                            onChange={(event) =>
                                setParameter(event.target.value)
                            }
                        />
                        <Button
                            onClick={() => {
                                if (inputRef.current?.value) {
                                    fetchData([inputRef.current.value]);
                                }
                            }}
                        >
                            Подтвердить
                        </Button>
                    </div>
                )}
            </div>
            <DataTable
                data={data}
                columnDefs={getColumnDefs("", props.columns, false)}
                pageSize={props.pageSize}
                customEmptyTableText={
                    props.withParameter
                        ? 'Введите параметр в поле выше и нажмите кнопку "Подтвердить".'
                        : undefined
                }
            >
                <div className="space-x-4 py-4">
                    <Button
                        onClick={() => writeToExcel(data, props.columns)}
                        disabled={data.length === 0}
                    >
                        Экспортировать в Excel
                    </Button>
                    <QueryChartDialog
                        title={props.title}
                        data={data}
                        columns={props.columns}
                        disabled={data.length === 0}
                    />
                </div>
            </DataTable>
        </div>
    );
}
