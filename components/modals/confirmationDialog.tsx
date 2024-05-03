import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
    text?: string;
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    modalTitle: string;
    modalDescription: string;
    onConfirm: () => void;
    skipConfirmation?: boolean;
    customControls?: {
        open: boolean;
        setOpen: (value: boolean) => void;
    };
};

export default function ConfirmationDialog(props: Props) {
    const [open, setOpen] = useState(false);

    function changeOpen(value: boolean) {
        if (value && props.skipConfirmation) {
            props.onConfirm();
            return;
        }
        const setOpenFn = props.customControls
            ? props.customControls.setOpen
            : setOpen;
        setOpenFn(value);
    }

    return (
        <Dialog
            open={props.customControls ? props.customControls.open : open}
            onOpenChange={changeOpen}
        >
            {!props.customControls && (
                <DialogTrigger asChild>
                    <Button>{props.text}</Button>
                </DialogTrigger>
            )}
            <DialogContent
                className="sm:max-w-[425px]"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{props.modalTitle}</DialogTitle>
                    <DialogDescription>
                        {props.modalDescription}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => changeOpen(false)}>
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        variant={props.variant}
                        onClick={props.onConfirm}
                    >
                        Подтвердить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
