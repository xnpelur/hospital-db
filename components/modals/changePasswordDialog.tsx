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
import { useEffect, useState } from "react";
import { runFunction } from "@/lib/db";
import ConfirmationDialog from "./confirmationDialog";
import { requiredPassword, requiredString } from "@/lib/zodObjects";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    username: string;
};

export default function ChangePasswordDialog(props: Props) {
    const [credentialsText, setCredentialsText] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const formSchema = z
        .object({
            username: requiredString,
            newPassword: requiredPassword,
            confirmPassword: requiredPassword,
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
        await runFunction<null>("change_password", [
            values.username,
            values.newPassword,
        ]);

        setCredentialsText(
            `Имя пользователя: ${values.username}\nПароль: ${values.newPassword}`
        );
        setConfirmationOpen(true);
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
            <ConfirmationDialog
                modalTitle="Изменение данных для входа"
                modalDescription={credentialsText}
                onConfirm={() => {
                    setConfirmationOpen(false);
                    props.setOpen(false);
                    form.reset({
                        username: props.username,
                        newPassword: "",
                        confirmPassword: "",
                    });
                }}
                customControls={{
                    open: confirmationOpen,
                    setOpen: setConfirmationOpen,
                }}
                hideCancel={true}
            />
        </Dialog>
    );
}
