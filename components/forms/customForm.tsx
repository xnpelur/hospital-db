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

type Props = {
    tableName: string;
    columns: SimplifiedColumnDef[];
    onFormSubmit: () => void;
    row?: any;
};

export default function CustomForm(props: Props) {
    const [credentials, setCredentials] = useState<Credentials | undefined>();
    const formSchema = z.object(
        Object.fromEntries(
            props.columns.map((column) => [
                column.key,
                column.type == "date"
                    ? z.date()
                    : column.type == "number"
                      ? z.coerce.number().min(0)
                      : z.string().min(1),
            ])
        )
    );

    const defaultValueEntries: [string, any][] = useMemo(() => {
        const entries: [string, any][] = [];
        if (props.row) {
            props.columns.forEach((column) => {
                entries.push([column.key, props.row[column.key]]);
            });
        } else {
            props.columns.forEach((column) => {
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
    }, [props.columns, props.row]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: Object.fromEntries(defaultValueEntries),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (credentials) {
            await runFunction<null>("add_user", [
                credentials.username,
                credentials.password,
                props.tableName,
            ]);
        }
        const args: any[] = [];
        props.columns.forEach((column) => {
            args.push(values[column.key]);
        });
        if (props.row) {
            args.push(props.row.id);
            await runFunction<null>(`update_${props.tableName}`, args);
        } else {
            await runFunction<null>(`insert_${props.tableName}`, args);
        }
        props.onFormSubmit?.();
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4 py-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {props.columns.map((column, index) => {
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
                                                    value={field.value as Date}
                                                    onSelect={field.onChange}
                                                    disabled={column.disabled}
                                                />
                                            ) : column.values ? (
                                                <CustomCombobox
                                                    items={column.values}
                                                    value={
                                                        field.value as string
                                                    }
                                                    setValue={field.onChange}
                                                />
                                            ) : (
                                                <Input
                                                    value={
                                                        (field.value as
                                                            | string
                                                            | number) ?? ""
                                                    }
                                                    onChange={field.onChange}
                                                    disabled={column.disabled}
                                                    type={
                                                        column.type == "number"
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
                <DialogFooter>
                    <Button type="submit">Подтвердить</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
