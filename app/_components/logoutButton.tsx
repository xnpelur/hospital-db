"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogHeader,
    DialogFooter,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { logout } from "@/lib/auth";
import { ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    async function signOutClicked() {
        await logout();
        router.refresh();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-2 py-1">
                    <ExitIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader className="space-y-4">
                    <DialogTitle>Вы уверены, что хотите выйти?</DialogTitle>
                    <DialogDescription>
                        Если вы выйдете из аккаунта, вам придется ввести свои
                        учетные данные при следующем входе.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Отмена
                    </Button>
                    <Button onClick={signOutClicked}>Выйти</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
