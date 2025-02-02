import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { getTableValues, runFunction } from "@/lib/db";
import { ClinicalRecord, Treatment, TreatmentRecord } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import CustomCombobox from "@/components/forms/customCombobox";
import CustomDatePicker from "@/components/forms/customDatePicker";
import { getToday } from "@/lib/dates";
import {
    requiredDateFromToday,
    requiredNumber,
    requiredString,
} from "@/lib/zodObjects";

type Props = {
    clinicalRecords: ClinicalRecord[];
    onFormSubmit?: () => void;
    treatmentRecord?: TreatmentRecord;
};

function parseRepeatInterval(s: string): {
    amount: number;
    unit: string;
} {
    const tokens = s.split(" ");
    const lastToken = tokens[tokens.length - 1];

    let amount = 1;
    let unit = "";

    if (lastToken === "час" || lastToken === "часа" || lastToken === "часов") {
        unit = "час";
    } else if (
        lastToken === "день" ||
        lastToken === "дня" ||
        lastToken === "дней"
    ) {
        unit = "день";
    } else if (
        lastToken === "месяц" ||
        lastToken === "месяца" ||
        lastToken === "месяцев"
    ) {
        unit = "месяц";
    } else {
        throw new Error("Invalid repeat interval string");
    }

    // If amount value is missing, amount = 1, else:
    if (tokens.length > 2) {
        const valueToken = tokens[tokens.length - 2];
        amount = parseInt(valueToken, 10);
        if (isNaN(amount)) {
            throw new Error("Invalid repeat interval string");
        }
    }

    return { amount, unit };
}

const formSchema = z
    .object({
        treatment: requiredString,
        startDate: requiredDateFromToday,
        endDate: requiredDateFromToday,
        repeatInterval: z.object({
            amount: requiredNumber,
            unit: requiredString,
        }),
        disease: requiredString,
    })
    .refine((form) => form.startDate <= form.endDate, {
        message: "Дата окончания процедуры не может быть раньше даты начала",
        path: ["endDate"],
    });

export default function TreatmentRecordForm(props: Props) {
    const defaultTreatments = props.treatmentRecord
        ? [
              {
                  id: 0,
                  title: props.treatmentRecord.title,
                  cost: 0,
                  dependencies: 0,
              },
          ]
        : [];
    const [treatments, setTreatments] =
        useState<Treatment[]>(defaultTreatments);

    useEffect(() => {
        async function fetchTreatments() {
            const data = await getTableValues<Treatment>(
                "treatment_with_dependencies"
            );
            setTreatments(data);
        }
        fetchTreatments();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: props.treatmentRecord
            ? {
                  treatment: props.treatmentRecord.title,
                  startDate: props.treatmentRecord.start_date,
                  endDate: props.treatmentRecord.end_date,
                  repeatInterval: parseRepeatInterval(
                      props.treatmentRecord.repeat_interval
                  ),
                  disease: props.treatmentRecord.disease,
              }
            : {
                  treatment: "",
                  startDate: new Date(),
                  repeatInterval: {
                      amount: 1,
                      unit: "час",
                  },
                  disease: "",
              },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const repeatIntervalUnit =
            values.repeatInterval.unit == "час"
                ? "hour"
                : values.repeatInterval.unit == "день"
                  ? "day"
                  : "month";
        const repeatInterval = `${values.repeatInterval.amount} ${repeatIntervalUnit}`;

        const clinicalRecordId = props.clinicalRecords.find(
            (record) => record.disease_title === values.disease
        )?.id;

        const args: any[] = [
            values.treatment,
            values.startDate,
            values.endDate,
            repeatInterval,
            clinicalRecordId,
        ];

        if (props.treatmentRecord) {
            args.unshift(props.treatmentRecord.id);
            await runFunction<null>("update_treatment_record", args);
        } else {
            await runFunction<null>("insert_treatment_record", args);
        }

        props.onFormSubmit?.();
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4 py-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="treatment"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-x-4">
                            <FormLabel>Процедура</FormLabel>
                            <div className="col-span-2 flex items-center gap-2">
                                <FormControl>
                                    <CustomCombobox
                                        items={treatments.map(
                                            (treatment) => treatment.title
                                        )}
                                        value={field.value}
                                        setValue={(value) =>
                                            form.setValue(field.name, value)
                                        }
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="col-span-2 col-start-2" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-x-4">
                            <FormLabel>Дата начала</FormLabel>
                            <div className="col-span-2 flex items-center gap-2">
                                <FormControl>
                                    <CustomDatePicker
                                        value={field.value}
                                        onSelect={field.onChange}
                                        disabled={
                                            props.treatmentRecord !== undefined
                                        }
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="col-span-2 col-start-2" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-x-4">
                            <FormLabel>Дата окончания</FormLabel>
                            <div className="col-span-2 flex items-center gap-2">
                                <FormControl>
                                    <CustomDatePicker
                                        value={field.value}
                                        onSelect={field.onChange}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="col-span-2 col-start-2" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repeatInterval"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-x-4">
                            <FormLabel>Интервал повторения</FormLabel>
                            <div className="col-span-2 flex items-center gap-2">
                                <FormControl>
                                    <Input
                                        className="w-20"
                                        type="number"
                                        min={1}
                                        value={field.value.amount}
                                        onChange={(e) => {
                                            form.setValue(field.name, {
                                                amount: parseInt(
                                                    e.target.value
                                                ),
                                                unit: field.value.unit,
                                            });
                                        }}
                                    />
                                </FormControl>
                                <CustomCombobox
                                    items={["час", "день", "месяц"]}
                                    value={field.value.unit}
                                    setValue={(value) =>
                                        form.setValue(field.name, {
                                            amount: field.value.amount,
                                            unit: value,
                                        })
                                    }
                                    hideSearch={true}
                                />
                            </div>
                            <FormMessage className="col-span-2 col-start-2" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="disease"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-x-4">
                            <FormLabel>Болезнь</FormLabel>
                            <div className="col-span-2 flex items-center gap-2">
                                <FormControl>
                                    <CustomCombobox
                                        items={props.clinicalRecords.map(
                                            (record) => record.disease_title
                                        )}
                                        value={field.value}
                                        setValue={(value) =>
                                            form.setValue(field.name, value)
                                        }
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="col-span-2 col-start-2" />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit">Подтвердить</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
