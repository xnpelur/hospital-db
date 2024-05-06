import { getSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import DoctorPage from "./doctorPage";
import PatientPage from "./patientPage";
import AdminPage from "./adminPage";

export default async function Home() {
    const session = await getSession();
    switch (session?.user.role ?? "") {
        case "doctor":
            return <DoctorPage />;
        case "patient":
            return <PatientPage />;
        case "admin":
            return <AdminPage />;
        default:
            notFound();
    }
}
