import TablePanel from "@/components/tablePanel";
import { runFunction } from "@/lib/db";
import { Treatment } from "@/lib/types";

export default async function TreatmentsPage() {
    const treatments = await runFunction<Treatment>("get_treatments", []);

    return (
        <TablePanel
            title="Процедуры"
            data={treatments}
            columns={[
                {
                    key: "title",
                    title: "Название процедуры",
                    sortable: true,
                },
                {
                    key: "cost",
                    title: "Стоимость процедуры",
                    sortable: true,
                },
            ]}
            editable={true}
            pageSize={10}
        />
    );
}
