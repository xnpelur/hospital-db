import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    username: string;
};

export default function ChangePasswordDialog(props: Props) {
    const formSchema = z
        .object({
            username: z.string().min(1),
            newPassword: z.string().min(4),
            confirmPassword: z.string().min(4),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
            message: "Пароли не совпадают",
            path: ["confirmPassword"],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    useEffect(
        () => form.setValue("username", props.username),
        [props.username, form]
    );

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent
                className="sm:max-w-[425px]"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader className="pb-2">
                    <DialogTitle>Изменение пароля</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="grid gap-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="items-center">
                                    <FormLabel>Имя пользователя</FormLabel>
                                    <div className="flex items-center">
                                        <FormControl>
                                            <Input
                                                value={field.value}
                                                onChange={(e) => {
                                                    form.setValue(
                                                        field.name,
                                                        e.target.value
                                                    );
                                                }}
                                                disabled={true}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="col-span-2 col-start-2" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem className="items-center">
                                    <FormLabel>Новый пароль</FormLabel>
                                    <div className="flex items-center">
                                        <FormControl>
                                            <Input
                                                type="password"
                                                value={field.value}
                                                onChange={(e) => {
                                                    form.setValue(
                                                        field.name,
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="col-span-2 col-start-2" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="items-center">
                                    <FormLabel>
                                        Подтвердите новый пароль
                                    </FormLabel>
                                    <div className="flex items-center">
                                        <FormControl>
                                            <Input
                                                type="password"
                                                value={field.value}
                                                onChange={(e) => {
                                                    form.setValue(
                                                        field.name,
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="col-span-2 col-start-2" />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <Button
                                variant="ghost"
                                onClick={(e) => {
                                    props.setOpen(false);
                                    e.preventDefault();
                                }}
                            >
                                Отмена
                            </Button>
                            <Button type="submit">Подтвердить</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
