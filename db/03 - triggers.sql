CREATE OR REPLACE FUNCTION update_patient_record_discharge_date()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    max_end_date DATE;
BEGIN
    SELECT MAX(end_date)
    INTO max_end_date
    FROM treatment_record
    WHERE clinical_record_id IN (
        SELECT id
        FROM clinical_record
        WHERE patient_record_id = (
            SELECT patient_record_id
            FROM clinical_record
            WHERE id = NEW.clinical_record_id
        )
    );

    UPDATE patient_record
    SET discharge_date = CASE
        WHEN max_end_date > discharge_date THEN max_end_date
        ELSE discharge_date
    END
    WHERE id = (
        SELECT patient_record_id
        FROM clinical_record
        WHERE id = (
            SELECT id
            FROM clinical_record
            WHERE id = NEW.clinical_record_id
        )
    );

    RETURN NEW;
END;
$$;

CREATE TRIGGER update_patient_record_discharge_date_trigger
AFTER INSERT OR UPDATE ON treatment_record
FOR EACH ROW
EXECUTE FUNCTION update_patient_record_discharge_date();
