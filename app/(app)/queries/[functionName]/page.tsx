import TablePanel from "@/components/tablePanel";
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

    const data = await runFunction<any>(query.function_name, []);

    return (
        <div className="flex h-full flex-col space-y-6">
            <TablePanel
                tableName=""
                data={data}
                columns={query.columns}
                title={query.title}
                editable={false}
                pageSize={10}
            />
        </div>
    );
}
