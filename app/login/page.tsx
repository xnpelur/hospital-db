import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSession, login } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getSession();
    if (session !== null) {
        redirect("/");
    }

    return (
        <div className="flex h-full items-center pb-20">
            <Card className="mx-auto w-96 max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Вход</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        action={async () => {
                            "use server";
                            await login();
                        }}
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Имя пользователя</Label>
                                <Input id="username" required type="text" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Пароль</Label>
                                <Input id="password" required type="password" />
                            </div>
                            <div className="pt-2">
                                <Button className="w-full" type="submit">
                                    Войти
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
