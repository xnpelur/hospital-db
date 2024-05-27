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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import CustomDatePicker from "./customDatePicker";
import { SimplifiedColumnDef } from "@/lib/types";
import CustomCombobox from "./customCombobox";
import { Credentials, generateCredentials } from "@/lib/credentials";
import { useMemo, useState } from "react";
import { PhoneInput } from "./phoneInput";
import ConfirmationDialog from "../modals/confirmationDialog";
import { requiredDate, requiredNumber, requiredString } from "@/lib/zodObjects";

type Props = {
    tableName: string;
    columns: SimplifiedColumnDef[];
    onFormSubmit: () => void;
    row?: any;
};

export default function CustomForm(props: Props) {
    const [credentials, setCredentials] = useState<Credentials | undefined>();
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [credentialsText, setCredentialsText] = useState("");

    const columns = useMemo(
        () => props.columns.filter((column) => !column.hiddenInForm),
        [props.columns]
    );

    const formSchema = z.object(
        Object.fromEntries(
            columns.map((column) => [
                column.key,
                column.type == "date"
                    ? requiredDate
                    : column.type == "number"
                      ? requiredNumber
                      : requiredString,
            ])
        )
    );

    const defaultValueEntries: [string, any][] = useMemo(() => {
        const entries: [string, any][] = [];
        if (props.row) {
            columns.forEach((column) => {
                entries.push([column.key, props.row[column.key]]);
            });
        } else {
            columns.forEach((column) => {
                if (column.key === "username") {
                    const creds = generateCredentials();
                    entries.push([column.key, creds.username]);
                    setCredentials(creds);
                } else if (column.default) {
                    entries.push([column.key, column.default]);
                }
            });
        }
        return entries;
    }, [columns, props.row]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: Object.fromEntries(defaultValueEntries),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const args: any[] = [];
            columns.forEach((column) => {
                args.push(values[column.key]);
            });
            if (props.row) {
                args.push(props.row.id);
                await runFunction<null>(`update_${props.tableName}`, args);
            } else {
                await runFunction<null>(`insert_${props.tableName}`, args);
            }

            if (credentials) {
                await runFunction<null>("add_user", [
                    credentials.username,
                    credentials.password,
                    props.tableName === "doctor" ? "doctor" : "patient",
                ]);

                setCredentialsText(
                    `Имя пользователя: ${credentials.username}\nПароль: ${credentials.password}`
                );
                setConfirmationOpen(true);
            } else {
                props.onFormSubmit?.();
            }
        } catch (e) {
            form.setError("root", { message: (e as Error).message });
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    className="grid gap-4 py-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {columns.map((column, index) => {
                        return (
                            <FormField
                                key={index}
                                control={form.control}
                                name={column.key}
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-3 items-center gap-x-4">
                                        <FormLabel>{column.title}</FormLabel>
                                        <div className="col-span-2 flex items-center gap-2">
                                            <FormControl>
                                                {column.type === "date" ? (
                                                    <CustomDatePicker
                                                        value={
                                                            field.value as Date
                                                        }
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        disabled={
                                                            column.disabled
                                                        }
                                                    />
                                                ) : column.type === "phone" ? (
                                                    <PhoneInput
                                                        value={
                                                            (field.value as string) ??
                                                            ""
                                                        }
                                                        onChange={
                                                            field.onChange
                                                        }
                                                    />
                                                ) : column.values ? (
                                                    <CustomCombobox
                                                        items={column.values}
                                                        value={
                                                            field.value as string
                                                        }
                                                        setValue={
                                                            field.onChange
                                                        }
                                                    />
                                                ) : (
                                                    <Input
                                                        value={
                                                            (field.value as
                                                                | string
                                                                | number) ?? ""
                                                        }
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        disabled={
                                                            column.disabled
                                                        }
                                                        type={
                                                            column.type ==
                                                            "number"
                                                                ? "number"
                                                                : undefined
                                                        }
                                                    />
                                                )}
                                            </FormControl>
                                        </div>
                                        <FormMessage className="col-span-2 col-start-2" />
                                    </FormItem>
                                )}
                            />
                        );
                    })}
                    {form.formState.errors.root && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {form.formState.errors.root.message}
                        </p>
                    )}
                    <DialogFooter>
                        <Button type="submit">Подтвердить</Button>
                    </DialogFooter>
                </form>
            </Form>
            <ConfirmationDialog
                modalTitle="Данные для входа"
                modalDescription={credentialsText}
                onConfirm={() => {
                    setConfirmationOpen(false);
                    props.onFormSubmit?.();
                }}
                customControls={{
                    open: confirmationOpen,
                    setOpen: setConfirmationOpen,
                }}
                hideCancel={true}
            />
        </div>
    );
}
