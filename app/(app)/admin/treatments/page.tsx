import TablePanel from "@/components/tablePanel";
import { getTableValues } from "@/lib/db";
import { Treatment } from "@/lib/types";

export default async function TreatmentsPage() {
    const treatments = await getTableValues<Treatment>(
        "treatment_with_dependencies"
    );

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
                    type: "number",
                    sortable: true,
                },
            ]}
            editable={true}
            pageSize={10}
            tableName="treatment"
        />
    );
}
