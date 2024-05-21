"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    title: string;
    description: string;
    functionName: string;
};

export default function HeadDoctorPageCard(props: Props) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <div>
                    <h3 className="text-lg font-medium">{props.title}</h3>
                    <p className="text-gray-500">{props.description}</p>
                </div>
            </div>
            <Button
                onClick={() => router.push(`/queries/${props.functionName}`)}
            >
                Открыть отчёт
            </Button>
        </div>
    );
}
