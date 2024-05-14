import TablePanel from "@/components/tablePanel";
import { getTableValues } from "@/lib/db";
import { SocialStatus } from "@/lib/types";

export default async function SocialStatusesPage() {
    const socialStatuses = await getTableValues<SocialStatus>(
        "social_statuses_with_dependencies"
    );

    return (
        <TablePanel
            title="Социальные статусы"
            data={socialStatuses}
            columns={[
                {
                    key: "title",
                    title: "Название социального статуса",
                    sortable: true,
                },
            ]}
            editable={true}
            pageSize={10}
            tableName="social_status"
        />
    );
}
