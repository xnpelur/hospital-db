"use client";

import { Input } from "@/components/ui/input";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { runFunction } from "@/lib/db";
import { changeSessionPassword } from "@/lib/auth";
import ConfirmationDialog from "@/components/modals/confirmationDialog";
import { useState } from "react";
import { requiredPassword, requiredString } from "@/lib/zodObjects";

type Props = {
    currentUsername: string;
    currentUserPassword: string;
};

export default function ChangePasswordForm(props: Props) {
    const [credentialsText, setCredentialsText] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const formSchema = z
        .object({
            currentPassword: requiredString,
            newPassword: requiredPassword,
            confirmPassword: requiredPassword,
        })
        .refine((data) => data.currentPassword === props.currentUserPassword, {
            message: "Текущий пароль введён неверно",
            path: ["currentPassword"],
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
            message: "Пароли не совпадают",
            path: ["confirmPassword"],
        })
        .refine((data) => data.newPassword !== data.currentPassword, {
            message: "Новый пароль не может быть таким же, как и старый",
            path: ["newPassword"],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await runFunction<null>("change_password", [
            props.currentUsername,
            values.newPassword,
        ]);
        await changeSessionPassword(values.newPassword);

        setCredentialsText(
            `Имя пользователя: ${props.currentUsername}\nПароль: ${values.newPassword}`
        );
        setConfirmationOpen(true);
    }

    return (
        <div>
            <Form {...form}>
                <form
                    className="grid gap-8 p-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <CardContent className="space-y-4 p-0">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem className="items-center">
                                    <FormLabel>Текущий пароль</FormLabel>
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
                    </CardContent>
                    <CardFooter className="p-0 py-2">
                        <Button className="w-full" type="submit">
                            Изменить пароль
                        </Button>
                    </CardFooter>
                </form>
            </Form>
            <ConfirmationDialog
                modalTitle="Изменение данных для входа"
                modalDescription={credentialsText}
                onConfirm={() => {
                    setConfirmationOpen(false);
                    form.reset({
                        currentPassword: "",
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
        </div>
    );
}
