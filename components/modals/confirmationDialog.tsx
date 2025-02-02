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
    hideCancel?: boolean;
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
                    <Button variant={props.variant}>{props.text}</Button>
                </DialogTrigger>
            )}
            <DialogContent
                className="sm:max-w-[425px]"
                onCloseAutoFocus={(e) => e.preventDefault()}
                hideCloseButton={props.hideCancel}
            >
                <DialogHeader>
                    <DialogTitle>{props.modalTitle}</DialogTitle>
                    <DialogDescription className="py-2">
                        {props.modalDescription
                            .split("\n")
                            .map((paragraph, index) => (
                                <span key={index} className="block">
                                    {paragraph}
                                </span>
                            ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {!props.hideCancel && (
                        <Button
                            variant="ghost"
                            onClick={() => changeOpen(false)}
                        >
                            Отмена
                        </Button>
                    )}
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
