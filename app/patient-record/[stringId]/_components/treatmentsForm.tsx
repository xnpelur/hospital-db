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
import { runFunction } from "@/lib/db";
import { ClinicalRecord, Treatment } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import CustomCombobox from "./customCombobox";
import CustomDatePicker from "./customDatePicker";

type Props = {
    clinicalRecords: ClinicalRecord[];
    onFormSubmit?: () => void;
};

const formSchema = z
    .object({
        treatment: z.string().min(1),
        startDate: z.date(),
        endDate: z.date(),
        repeatInterval: z.object({
            amount: z.coerce.number().min(1),
            unit: z.string().min(1),
        }),
        disease: z.string().min(1),
    })
    .refine((form) => form.startDate <= form.endDate, {
        message: "Дата окончания процедуры не может быть раньше даты начала",
        path: ["endDate"],
    });

export default function TreatmentsForm(props: Props) {
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    const router = useRouter();

    useEffect(() => {
        async function fetchTreatments() {
            const data = await runFunction<Treatment>("get_treatments", []);
            setTreatments(data);
        }
        fetchTreatments();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            repeatInterval: {
                amount: 1,
                unit: "час",
            },
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
        const clinicalRecord = props.clinicalRecords.find(
            (record) => record.disease_title === values.disease
        );

        await runFunction<null>("insert_treatment_record", [
            values.treatment,
            values.startDate,
            values.endDate,
            repeatInterval,
            clinicalRecord?.id,
        ]);

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
                                    allowEmpty={false}
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
