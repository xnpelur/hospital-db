import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TreatmentsEditModal from "./treatmentsEditModal";
import { runFunction } from "@/lib/db";
import { RecordDependencies } from "@/lib/types";

type Props = {
    title: string;
    description: string;
    buttonText: string;
};

export default async function AdminPageCard(props: Props) {
    const treatmentsDependencies = await runFunction<RecordDependencies>(
        "get_treatments_with_dependencies",
        []
    );

    return (
        <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-50">
                    {props.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                    {props.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TreatmentsEditModal
                    buttonText={props.buttonText}
                    treatmentsDependencies={treatmentsDependencies}
                />
            </CardContent>
        </Card>
    );
}
