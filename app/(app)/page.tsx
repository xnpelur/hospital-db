import { getSession } from "@/lib/auth";
import DoctorsPage from "./doctorsPage";
import { notFound } from "next/navigation";
import PatientPage from "./patientPage";

export default async function Home() {
    const session = await getSession();
    switch (session?.user.role ?? "") {
        case "doctor":
            return <DoctorsPage />;
        case "patient":
            return <PatientPage />;
        default:
            notFound();
    }
}
