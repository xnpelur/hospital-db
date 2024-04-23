const {
    getFullName,
    getRandomDate,
    getRandomInt,
    getUsername,
    getPassword,
    getPhoneNumber,
    getRandomInterval,
    getDateAfterInterval,
} = require("./randomizer");
const path = require("node:path");
const fs = require("node:fs");

const socialStatuses = ["Предприниматель", "Служащий", "Рабочий", "Пенсионер"];
const diseases = [
    "Грипп",
    "Простуда",
    "Ангина",
    "Бронхит",
    "Аллергия",
    "Диабет",
    "Астма",
    "Гепатит",
    "Пневмония",
    "Туберкулез",
    "Инфаркт",
    "Инсульт",
    "Артрит",
    "Остеопороз",
    "Эпилепсия",
];
const treatments = [
    ["УЗИ органов брюшной полости", 3500],
    ["МРТ головного мозга", 8000],
    ["ЭКГ", 1500],
    ["Гастроэнтероскопия", 600],
    ["Лабораторный анализ крови", 1200],
    ["Рентген грудной клетки", 2000],
    ["КТ грудной клетки", 7000],
    ["Массаж спины", 2500],
    ["Физиотерапия", 1800],
    ["Лечебная гимнастика", 2000],
    ["Озонотерапия", 3000],
    ["УЗИ щитовидной железы", 2800],
    ["КТ брюшной полости", 7500],
    ["Лазерная терапия", 4000],
    ["Инъекция антибиотика", 1000],
    ["Процедура диэлектрофореза", 2800],
    ["Фонофорез", 2500],
    ["МРТ позвоночника", 8500],
    ["Фиброгастродуоденоскопия", 7000],
    ["Эхокардиография", 4500],
    ["Ингаляции", 1500],
    ["Магнитотерапия", 2200],
    ["Массаж ног", 2300],
    ["УЗИ почек", 3200],
    ["КТ головного мозга", 7500],
    ["Карбокситерапия", 4000],
    ["Фотодинамическая терапия", 5500],
    ["УЗИ суставов", 3800],
    ["Физиотермия", 3200],
    ["Инъекция гиалуроновой кислоты", 4500],
    ["МРТ суставов", 900],
    ["Дарсонвализация", 2700],
];

function getDateAfterNDays(dateString, days) {
    const newDate = new Date(dateString);
    newDate.setDate(newDate.getDate() + days);
    return newDate.toISOString().substring(0, 10);
}

function getToday() {
    const date = new Date();
    return date.toISOString().substring(0, 10);
}

function getPatients(count) {
    const patients = [];
    const users = [];

    for (let i = 0; i < count; i++) {
        const fullName = getFullName();
        const birthDate = getRandomDate("1960-01-01", "2004-01-01");
        const socialStatusId = 1 + getRandomInt(socialStatuses.length);
        const username = getUsername();
        const password = getPassword();

        patients.push([fullName, birthDate, socialStatusId, username]);
        users.push({
            username: username,
            password: password,
        });
    }

    return [patients, users];
}

function getDepartments() {
    const titles = [
        "Терапевтическое отделение",
        "Хирургическое отделение",
        "Дерматологическое отделение",
        "Травматологическое отделение",
        "Инфекционное отделение",
        "Неврологическое отделение",
    ];
    const departments = [];

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const bedsNumber = 400 + getRandomInt(800);
        const phoneNumber = getPhoneNumber();

        departments.push([title, bedsNumber, phoneNumber]);
    }

    return departments;
}

function getDoctors(count, departmentsCount) {
    const categories = ["Вторая", "Первая", "Высшая"];
    const doctors = [];
    const users = [];

    for (let i = 0; i < count; i++) {
        const fullName = getFullName();
        const departmentId = 1 + getRandomInt(departmentsCount);
        const enrollmentDate = getRandomDate("1990-01-01", "2000-01-01");
        const category = categories[getRandomInt(categories.length)];
        const salary = (40 + getRandomInt(100)) * 1000;
        const username = getUsername();
        const password = getPassword();

        doctors.push([
            fullName,
            departmentId,
            enrollmentDate,
            category,
            salary,
            username,
        ]);
        users.push({
            username: username,
            password: password,
        });
    }

    return [doctors, users];
}

function getPatientRecords(count, patients, doctors) {
    const patientRecords = [];
    const lastAdmissions = new Map();

    for (let i = 0; i < count; i++) {
        const patientId = 1 + getRandomInt(patients.length);
        const doctorId = 1 + getRandomInt(doctors.length);

        const lastAdmission = lastAdmissions.get(patientId);

        let admissionDateMin, admissionDateMax;
        if (lastAdmission !== undefined) {
            admissionDateMax = getDateAfterNDays(lastAdmission, -750);
            admissionDateMin = getDateAfterNDays(admissionDateMax, -1000);
        } else {
            admissionDateMax = getToday();
            admissionDateMin = getDateAfterNDays(admissionDateMax, -100);
        }

        const admissionDate = getRandomDate(admissionDateMin, admissionDateMax);
        const dischargeDate = getDateAfterNDays(admissionDate, 7);

        const recordAdmissionDate = new Date(admissionDate);
        const doctorEnrollmentDate = new Date(doctors[doctorId - 1][2]);
        const patientBirthDate = new Date(patients[patientId - 1][1]);
        if (
            recordAdmissionDate < doctorEnrollmentDate ||
            recordAdmissionDate <= patientBirthDate
        ) {
            continue;
        }

        lastAdmissions.set(patientId, admissionDate);

        patientRecords.push([
            patientId,
            doctorId,
            admissionDate,
            dischargeDate,
        ]);
    }

    return patientRecords;
}

function getClinicalRecords(count, patientRecordsCount) {
    const clinicalRecords = [];
    const pairs = new Set();

    for (let i = 0; i < count; i++) {
        const patientRecordId = 1 + getRandomInt(patientRecordsCount);
        const diseaseId = 1 + getRandomInt(diseases.length);

        const pairString = `${patientRecordId},${diseaseId}`;
        if (pairs.has(pairString)) {
            continue;
        }
        pairs.add(pairString);

        clinicalRecords.push([patientRecordId, diseaseId]);
    }

    return clinicalRecords;
}

function getTreatmentRecords(count, clinicalRecords, patientRecords) {
    const treatmentRecords = [];

    for (let i = 0; i < count; i++) {
        const treatmentId = 1 + getRandomInt(treatments.length);
        const clinicalRecordId = 1 + getRandomInt(clinicalRecords.length);

        const clinicalRecord = clinicalRecords[clinicalRecordId - 1];
        const patientRecordId = clinicalRecord[0];
        const patientRecord = patientRecords[patientRecordId - 1];

        const startDateMin = patientRecord[2];
        const startDateMax = getDateAfterNDays(startDateMin, 14);

        const startDate = getRandomDate(startDateMin, startDateMax);
        const repeatInterval = getRandomInterval();
        const endDate = getDateAfterInterval(startDate, repeatInterval);

        treatmentRecords.push([
            treatmentId,
            clinicalRecordId,
            startDate,
            endDate,
            repeatInterval,
        ]);
    }

    return treatmentRecords;
}

function getValues(x) {
    return `(${x.map((y) => (typeof y === "number" ? y : `'${y}'`)).join(", ")})`;
}

function dumpUsers(patientUsers, doctorUsers) {
    const folderPath = path.join(__dirname, "credentials");

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const patientUsersCSV = patientUsers
        .map((user) => `${user.username},${user.password}`)
        .join("\n");
    const patientsFilePath = path.join(folderPath, "patients.csv");
    fs.writeFileSync(patientsFilePath, patientUsersCSV);
    console.log(`Patient users CSV file created: ${patientsFilePath}`);

    const doctorUsersCSV = doctorUsers
        .map((user) => `${user.username},${user.password}`)
        .join("\n");
    const doctorsFilePath = path.join(folderPath, "doctors.csv");
    fs.writeFileSync(doctorsFilePath, doctorUsersCSV);
    console.log(`Doctor users CSV file created: ${doctorsFilePath}`);
}

function getGeneratedData(maxRecordsNumber) {
    const patientsCount = maxRecordsNumber / 90 + getRandomInt(50);
    const doctorsCount = maxRecordsNumber / 2000 + getRandomInt(10);
    const patientRecordsCount = maxRecordsNumber / 30 + getRandomInt(250);
    const clinicalRecordsCount = maxRecordsNumber / 10 + getRandomInt(500);
    const treatmentRecordCount = maxRecordsNumber - 5000 + getRandomInt(5000);

    const departments = getDepartments();
    const [patients, patientUsers] = getPatients(patientsCount);
    const [doctors, doctorUsers] = getDoctors(doctorsCount, departments.length);
    const patientRecords = getPatientRecords(
        patientRecordsCount,
        patients,
        doctors
    );
    const clinicalRecords = getClinicalRecords(
        clinicalRecordsCount,
        patientRecords.length
    );
    const treatmentRecords = getTreatmentRecords(
        treatmentRecordCount,
        clinicalRecords,
        patientRecords
    );

    let query = "";

    for (let i = 0; i < patientUsers.length; i++) {
        const { username, password } = patientUsers[i];
        query += `CREATE USER ${username} WITH PASSWORD '${password}';\n`;
        query += `GRANT patient TO ${username};\n`;
    }

    for (let i = 0; i < doctorUsers.length; i++) {
        const { username, password } = doctorUsers[i];
        query += `CREATE USER ${username} WITH PASSWORD '${password}';\n`;
        query += `GRANT doctor TO ${username};\n`;
    }

    dumpUsers(patientUsers, doctorUsers);

    query += `INSERT INTO social_status (title) VALUES ${socialStatuses.map((x) => `('${x}')`).join(", ")};\n`;
    query += `INSERT INTO disease (title) VALUES ${diseases.map((x) => `('${x}')`).join(", ")};\n`;
    query += `INSERT INTO treatment (title, cost) VALUES ${treatments.map((x) => getValues(x)).join(", ")};\n`;
    query += `INSERT INTO patient (full_name, birth_date, social_status_id, username) VALUES ${patients.map((x) => getValues(x)).join(", ")};\n`;
    query += `INSERT INTO department (title, beds_number, phone) VALUES ${departments.map((x) => getValues(x)).join(", ")};\n`;
    query += `INSERT INTO doctor (full_name, department_id, enrollment_date, category, salary, username) VALUES ${doctors.map((x) => getValues(x)).join(", ")};\n`;

    query += `INSERT INTO patient_record (patient_id, doctor_id, admission_date, discharge_date) VALUES ${patientRecords.map((x) => getValues(x)).join(", ")};\n`;
    query += `INSERT INTO clinical_record (patient_record_id, disease_id) VALUES ${clinicalRecords.map((x) => getValues(x)).join(", ")};\n`;
    query += `INSERT INTO treatment_record (treatment_id, clinical_record_id, start_date, end_date, repeat_interval) VALUES ${treatmentRecords.map((x) => getValues(x)).join(", ")};\n`;

    return query;
}

module.exports = {
    getGeneratedData,
};
