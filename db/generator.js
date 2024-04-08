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
        const enrollmentDate = getRandomDate("2000-01-01", "2020-01-01");
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

function getPatientRecords(count, patientsCount, doctorsCount) {
    const patientRecords = [];

    for (let i = 0; i < count; i++) {
        const patientId = 1 + getRandomInt(patientsCount);
        const doctorId = 1 + getRandomInt(doctorsCount);
        const admissionDate = getRandomDate("2020-01-01", "2024-04-01");
        const dischargeDate = admissionDate;

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

    for (let i = 0; i < count; i++) {
        const patientRecordId = 1 + getRandomInt(patientRecordsCount);
        const diseaseId = 1 + getRandomInt(diseases.length);

        clinicalRecords.push([patientRecordId, diseaseId]);
    }

    return clinicalRecords;
}

function getTreatmentRecords(count, clinicalRecordsCount) {
    const treatmentRecords = [];

    for (let i = 0; i < count; i++) {
        const treatmentId = 1 + getRandomInt(treatments.length);
        const clinicalRecordId = 1 + getRandomInt(clinicalRecordsCount);
        const startDate = getRandomDate("2020-01-01", "2024-04-01");
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

function getGeneratedData(maxRecordsNumber) {
    const patientsCount = maxRecordsNumber / 150 + getRandomInt(50);
    const doctorsCount = maxRecordsNumber / 2000 + getRandomInt(10);
    const patientRecordsCount = maxRecordsNumber / 30 + getRandomInt(250);
    const clinicalRecordsCount = maxRecordsNumber / 7 + getRandomInt(1000);
    const treatmentRecordCount = maxRecordsNumber - 5000 + getRandomInt(5000);

    const departments = getDepartments();
    const [patients, patientUsers] = getPatients(patientsCount);
    const [doctors, doctorUsers] = getDoctors(doctorsCount, departments.length);
    const patientRecords = getPatientRecords(
        patientRecordsCount,
        patientsCount,
        doctorsCount
    );
    const clinicalRecords = getClinicalRecords(
        clinicalRecordsCount,
        patientRecordsCount
    );
    const treatmentRecords = getTreatmentRecords(
        treatmentRecordCount,
        clinicalRecordsCount
    );

    let query = "";

    query += `CREATE ROLE patient;\n`;
    query += `CREATE ROLE doctor;\n`;
    query += `CREATE USER admin WITH PASSWORD 'admin';\n`;
    query += `GRANT postgres TO patient;\n`;
    query += `GRANT postgres TO doctor;\n`;
    query += `GRANT postgres TO admin;\n`;

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
