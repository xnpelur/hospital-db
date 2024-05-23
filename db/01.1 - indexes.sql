CREATE INDEX idx_social_status_id ON social_status(id);
CREATE INDEX idx_patient_id ON patient(id);
CREATE INDEX idx_department_id ON department(id);
CREATE INDEX idx_doctor_id ON doctor(id);
CREATE INDEX idx_patient_record_id ON patient_record(id);
CREATE INDEX idx_disease_id ON disease(id);
CREATE INDEX idx_treatment_id ON treatment(id);
CREATE INDEX idx_clinical_record_id ON clinical_record(id);
CREATE INDEX idx_treatment_record_id ON treatment_record(id);

CREATE INDEX idx_social_status_title ON social_status(title);
CREATE INDEX idx_patient_full_name ON patient(full_name);
CREATE INDEX idx_department_title ON department(title);
CREATE INDEX idx_doctor_full_name ON doctor(full_name);
CREATE INDEX idx_disease_title ON disease(title);
CREATE INDEX idx_treatment_title ON treatment(title);