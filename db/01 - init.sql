CREATE DOMAIN positive_integer AS INTEGER
CHECK (VALUE > 0);

CREATE DOMAIN phone_number AS VARCHAR(255)
CHECK (VALUE ~ '\+\d{1,3} \(\d{2,3}\) \d{3}-\d{2}-\d{2}');

CREATE TABLE social_status (
  id SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL UNIQUE
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
  title VARCHAR(255) NOT NULL UNIQUE,
  beds_number positive_integer NOT NULL,
  phone phone_number NOT NULL
);

CREATE TABLE doctor (
  id SERIAL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  department_id INTEGER NOT NULL REFERENCES department(id),
  enrollment_date DATE NOT NULL,
  category VARCHAR(255) NOT NULL,
  salary positive_integer NOT NULL,
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
  title VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE treatment (
  id SERIAL UNIQUE,
  title VARCHAR(255) NOT NULL UNIQUE,
  cost positive_integer NOT NULL
);

CREATE TABLE clinical_record (
  id SERIAL UNIQUE,
  patient_record_id INTEGER NOT NULL REFERENCES patient_record(id),
  disease_id INTEGER NOT NULL REFERENCES disease(id),
  CONSTRAINT unique_patient_record_disease UNIQUE (patient_record_id, disease_id)
);

CREATE TABLE treatment_record (
  id SERIAL UNIQUE,
  treatment_id INTEGER NOT NULL REFERENCES treatment(id),
  clinical_record_id INTEGER NOT NULL REFERENCES clinical_record(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  repeat_interval interval NOT NULL
);

ALTER TABLE social_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient ENABLE ROW LEVEL SECURITY;
ALTER TABLE department ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_record ENABLE ROW LEVEL SECURITY;