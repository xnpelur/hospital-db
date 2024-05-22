import { getTableValues } from "@/lib/db";
import { Query } from "@/lib/types";
import HeadDoctorPageCard from "./_components/head-doctor/pageCard";

export default async function HeadDoctorPage() {
    const queries = await getTableValues<Query>("query");

    return (
        <div className="flex h-full max-h-[calc(80vh-100px)] flex-col space-y-8">
            <h1 className="text-3xl font-bold">Отчёты</h1>
            <div className="grid gap-6 overflow-y-auto pr-3">
                {queries.map((query, index) => (
                    <HeadDoctorPageCard
                        key={index}
                        title={query.title}
                        description={query.description}
                        functionName={query.function_name}
                    />
                ))}
            </div>
        </div>
    );
}
