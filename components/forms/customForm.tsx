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

type Props = {
    tableName: string;
    columns: SimplifiedColumnDef[];
    onFormSubmit: () => void;
};

export default function CustomForm(props: Props) {
    const formSchema = z.object(
        Object.fromEntries(
            props.columns.map((column) => [
                column.key,
                column.type == "date"
                    ? z.date()
                    : column.type == "number"
                      ? z.coerce.number().min(1)
                      : z.string().min(1),
            ])
        )
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: Object.fromEntries(
            props.columns
                .filter((column) => column.default)
                .map((column) => [column.key, column.default])
        ),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const args: any[] = [];
        props.columns.forEach((column) => {
            args.push(values[column.key]);
        });
        await runFunction<null>(`insert_${props.tableName}`, args);
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
                                            ) : (
                                                <Input
                                                    value={
                                                        (field.value as
                                                            | string
                                                            | number) ?? ""
                                                    }
                                                    onChange={field.onChange}
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
