CREATE TABLE social_status (
  id SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE patient (
  id SERIAL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  social_status_id INTEGER NOT NULL REFERENCES social_status(id),
  username NAME NOT NULL UNIQUE
);

CREATE TABLE department (
  id SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL,
  beds_number INTEGER NOT NULL,
  phone VARCHAR(255) NOT NULL
);

CREATE TABLE doctor (
  id SERIAL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  department_id INTEGER NOT NULL REFERENCES department(id),
  enrollment_date DATE NOT NULL,
  category VARCHAR(255) NOT NULL,
  salary INTEGER NOT NULL,
  username NAME NOT NULL UNIQUE
);

CREATE TABLE patient_record (
  id SERIAL UNIQUE,
  patient_id INTEGER NOT NULL REFERENCES patient(id),
  doctor_id INTEGER NOT NULL REFERENCES doctor(id),
  admission_date DATE NOT NULL,
  discharge_date DATE NOT NULL
);

CREATE TABLE disease (
  id SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE treatment (
  id SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL
);

CREATE TABLE clinical_record (
  id SERIAL UNIQUE,
  patient_record_id INTEGER NOT NULL REFERENCES patient_record(id),
  disease_id INTEGER NOT NULL REFERENCES disease(id)
);

CREATE TABLE treatment_record (
  id SERIAL UNIQUE,
  treatment_id INTEGER NOT NULL REFERENCES treatment(id),
  clinical_record_id INTEGER NOT NULL REFERENCES clinical_record(id),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  repeat_interval interval NOT NULL
);
