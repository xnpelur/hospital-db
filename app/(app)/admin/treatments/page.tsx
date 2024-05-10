import { getTreatmentColumns } from "@/components/columns/treatmentColumns";
import TablePanel from "@/components/tablePanel";
import { runFunction } from "@/lib/db";
import { Treatment } from "@/lib/types";

export default async function TreatmentsPage() {
    const treatments = await runFunction<Treatment>("get_treatments", []);

    return (
        <TablePanel
            title="Процедуры"
            data={treatments}
            columnsFunction={getTreatmentColumns}
            editable={true}
            pageSize={10}
        />
    );
}
