import QueryTablePanel from "@/components/queryTablePanel";
import { runFunction } from "@/lib/db";
import { Query } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function QueryPage({
    params,
}: {
    params: { functionName: string };
}) {
    const query = (
        await runFunction<Query>("get_query_by_function_name", [
            params.functionName,
        ])
    )[0];

    if (!query) {
        notFound();
    }

    return (
        <div className="flex h-full flex-col space-y-6">
            <QueryTablePanel
                columns={query.columns}
                functionName={query.function_name}
                title={query.title}
                pageSize={9}
                withParameter={query.with_parameter}
            />
        </div>
    );
}
