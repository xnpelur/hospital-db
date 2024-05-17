import { Card } from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import ChangePasswordForm from "./_components/changePasswordForm";

export default async function ChangePasswordPage() {
    const session = await getSession();
    if (!session) {
        return;
    }

    return (
        <div className="flex h-full  flex-1 items-center justify-center pb-12">
            <div className="mx-auto w-full max-w-lg space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Изменить пароль</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Обновите пароль для безопасности вашей учётной записи.
                    </p>
                </div>
                <Card>
                    <ChangePasswordForm
                        currentUsername={session.user.username}
                        currentUserPassword={session.user.password}
                    />
                </Card>
            </div>
        </div>
    );
}
