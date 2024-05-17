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

export default function Component() {
    const formSchema = z
        .object({
            currentPassword: z.string().min(1),
            newPassword: z.string().min(8),
            confirmPassword: z.string().min(8),
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
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="flex h-full  flex-1 items-center justify-center pb-12">
            <div className="mx-auto w-full max-w-lg space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Изменить пароль</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Обновите пароль для безопасности вашей учётной записи.
                    </p>
                </div>
                <Card>
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
                                            <FormLabel>
                                                Текущий пароль
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
                </Card>
            </div>
        </div>
    );
}
