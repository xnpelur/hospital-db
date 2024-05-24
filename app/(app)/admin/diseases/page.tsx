import TablePanel from "@/components/tablePanel";
import { getTableValues } from "@/lib/db";
import { Disease } from "@/lib/types";

export default async function DiseasesPage() {
    const diseases = await getTableValues<Disease>("disease_with_dependencies");

    return (
        <TablePanel
            title="Заболевания"
            data={diseases}
            columns={[
                {
                    key: "title",
                    title: "Название заболевания",
                    sortable: true,
                },
            ]}
            editable={true}
            pageSize={10}
            tableName="disease"
        />
    );
}
