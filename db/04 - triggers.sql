CREATE OR REPLACE FUNCTION update_patient_record_discharge_date()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    max_end_date DATE;
    record_type TEXT;
    cr_id INT;
BEGIN
    record_type = TG_OP;

    IF record_type = 'INSERT' OR record_type = 'UPDATE' THEN
        cr_id = NEW.clinical_record_id;
    ELSIF record_type = 'DELETE' THEN
        cr_id = OLD.clinical_record_id;
    END IF;
    
    SELECT MAX(end_date)
    INTO max_end_date
    FROM treatment_record
    WHERE clinical_record_id IN (
        SELECT id
        FROM clinical_record
        WHERE patient_record_id = (
            SELECT patient_record_id
            FROM clinical_record
            WHERE id = cr_id
        )
    );

    UPDATE patient_record
    SET discharge_date = (
        SELECT MAX(val)
        FROM (VALUES
            (max_end_date),
            (admission_date + INTERVAL '7 days')
        ) AS t(val)
    )
    WHERE id = (
        SELECT patient_record_id
        FROM clinical_record
        WHERE id = (
            SELECT id
            FROM clinical_record
            WHERE id = cr_id
        )
    );

    RETURN NEW;
END;
$$;

CREATE TRIGGER update_patient_record_discharge_date_trigger
AFTER INSERT OR UPDATE OR DELETE ON treatment_record
FOR EACH ROW
EXECUTE FUNCTION update_patient_record_discharge_date();

CREATE OR REPLACE FUNCTION validate_patient_record_dates()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    patient_birth_date DATE;
    doctor_enrollment_date DATE;
    max_end_date DATE;
    overlapping_record RECORD;
BEGIN
    IF NEW.discharge_date < NEW.admission_date THEN
        RAISE EXCEPTION 'Discharge date cannot be less than admission date for the patient record.';
    END IF;

    SELECT MAX(end_date)
    INTO max_end_date
    FROM treatment_record
    WHERE clinical_record_id IN (
        SELECT id
        FROM clinical_record
        WHERE patient_record_id = NEW.id
    );

    IF NEW.discharge_date < max_end_date THEN
        RAISE EXCEPTION 'Discharge date cannot be less than the maximum treatment end date for the patient record.';
    END IF;

    SELECT birth_date
    INTO patient_birth_date
    FROM patient
    WHERE id = NEW.patient_id;

    SELECT enrollment_date
    INTO doctor_enrollment_date
    FROM doctor
    WHERE id = NEW.doctor_id;

    IF NEW.admission_date < patient_birth_date THEN
        RAISE EXCEPTION 'Admission date cannot be earlier than the patient birth date.';
    END IF;

    IF NEW.admission_date < doctor_enrollment_date THEN
        RAISE EXCEPTION 'Admission date cannot be earlier than the doctor enrollment date.';
    END IF;

    SELECT pr.id, pr.admission_date, pr.discharge_date
    INTO overlapping_record
    FROM patient_record pr
    WHERE pr.patient_id = NEW.patient_id
    AND pr.id <> NEW.id
    AND (
        (NEW.admission_date >= pr.admission_date AND NEW.admission_date <= pr.discharge_date)
        OR (NEW.discharge_date >= pr.admission_date AND NEW.discharge_date <= pr.discharge_date)
        OR (NEW.admission_date <= pr.admission_date AND NEW.discharge_date >= pr.discharge_date)
    );

    IF FOUND THEN
        RAISE EXCEPTION 'New patient record (admission: %, discharge: %) overlaps with existing record (id: %, admission: %, discharge: %)',
            NEW.admission_date, NEW.discharge_date,
            overlapping_record.id, overlapping_record.admission_date, overlapping_record.discharge_date;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER validate_patient_record_dates_trigger
BEFORE INSERT OR UPDATE ON patient_record
FOR EACH ROW
EXECUTE FUNCTION validate_patient_record_dates();

CREATE OR REPLACE FUNCTION validate_treatment_record_start_date()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    patient_admission_date DATE;
BEGIN
    SELECT admission_date
    INTO patient_admission_date
    FROM patient_record
    WHERE id = (
        SELECT patient_record_id
        FROM clinical_record
        WHERE id = NEW.clinical_record_id
    );

    IF NEW.start_date < patient_admission_date THEN
        RAISE EXCEPTION 'Treatment start date cannot be earlier than the patient admission date.';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER validate_treatment_record_start_date_trigger
BEFORE INSERT OR UPDATE ON treatment_record
FOR EACH ROW
EXECUTE FUNCTION validate_treatment_record_start_date();