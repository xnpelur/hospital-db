import {
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { SimplifiedColumnDef } from "@/lib/types";
import { CChart } from "@coreui/react-chartjs";

type Props = {
    title: string;
    data: any[];
    columns: SimplifiedColumnDef[];
    disabled?: boolean;
};

export default function QueryChartDialog(props: Props) {
    const [open, setOpen] = useState(false);

    const showTrigger = useMemo(
        () =>
            props.columns.length === 2 &&
            typeof props.columns[0].type === "undefined" &&
            props.columns[1].type === "number",
        [props.columns]
    );

    const [labels, data] = useMemo(() => {
        const labels: any[] = [];
        const data: any[] = [];
        props.data.forEach((dataRow) => {
            labels.push(dataRow[props.columns[0].key]);
            data.push(dataRow[props.columns[1].key]);
        });
        return [labels, data];
    }, [props.columns, props.data]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {showTrigger && (
                <DialogTrigger asChild>
                    <Button className="px-3" disabled={props.disabled}>
                        Показать диаграмму
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[1400px]">
                <DialogHeader>
                    <DialogTitle className="pb-6">{props.title}</DialogTitle>
                    <CChart
                        type="bar"
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    backgroundColor: "#2194F0",
                                    data: data,
                                },
                            ],
                        }}
                        customTooltips={false}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            layout: {
                                padding: {
                                    left: 50,
                                    bottom: 10,
                                },
                            },
                        }}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
