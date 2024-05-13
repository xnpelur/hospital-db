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
import { SimplifiedColumnDef } from "@/lib/columnDefs";

const formSchema = z.object({
    title: z.string().min(1),
});

type Props = {
    columns: SimplifiedColumnDef[];
    onFormSubmit: () => void;
};

export default function DiseasesForm(props: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await runFunction<null>("add_disease", [values.title]);
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
                    name="title"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-x-4">
                            <FormLabel>Название</FormLabel>
                            <div className="col-span-2 flex items-center gap-2">
                                <FormControl>
                                    <Input {...field} />
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
