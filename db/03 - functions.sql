SET client_encoding TO 'utf8';

CREATE FUNCTION get_patient_records()
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        *
    FROM
        patient_records_view;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_current_patient_records()
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        *
    FROM
        patient_records_view pr
    WHERE
        pr.admission_date <= CURRENT_DATE
        AND pr.discharge_date >= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_patient_record_by_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        *
    FROM
        patient_records_view pr
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_clinical_records_by_patient_record_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    disease_title VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        cr.id,
        d.title as disease_title
    FROM
        clinical_record cr
    LEFT JOIN
        patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        disease d ON cr.disease_id = d.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION format_interval(num INT, unit_words TEXT[])
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    result TEXT;
    last_digit INT;
BEGIN
    last_digit := num % 10;
    
    IF num = 1 THEN
        result := 'каждый ' || unit_words[1];
    ELSIF last_digit = 1 AND num <> 11 THEN
        result := 'каждый ' || num || ' ' || unit_words[1];
    ELSIF last_digit >= 2 AND last_digit <= 4 AND (num < 12 OR num > 14) THEN
        result := 'каждые ' || num || ' ' || unit_words[2];
    ELSE
        result := 'каждые ' || num || ' ' || unit_words[3];
    END IF;
    
    RETURN result;
END;
$$;

CREATE FUNCTION get_human_readable_interval(interval_value INTERVAL)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    result TEXT;
BEGIN
    IF interval_value < INTERVAL '24 hour' THEN
        result := format_interval(round(extract(hour from interval_value))::INT, ARRAY['час', 'часа', 'часов']::TEXT[]);
    ELSIF interval_value < INTERVAL '1 month' THEN
        result := format_interval(round(extract(day from interval_value))::INT,  ARRAY['день', 'дня', 'дней']::TEXT[]);
    ELSE
        result := format_interval(round(extract(month from interval_value))::INT, ARRAY['месяц', 'месяца', 'месяцев']::TEXT[]);
    END IF;

    RETURN result;
END;
$$;

CREATE FUNCTION get_treatment_records_by_patient_record_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    title VARCHAR(255),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    repeat_interval TEXT,
    disease VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        tr.id,
        t.title,
        tr.start_date,
        tr.end_date,
        get_human_readable_interval(tr.repeat_interval) as repeat_interval,
        d.title as disease
    FROM
        treatment_record tr
    LEFT JOIN
        clinical_record cr ON tr.clinical_record_id = cr.id
    LEFT JOIN
        patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        disease d ON cr.disease_id = d.id
    LEFT JOIN
        treatment t ON tr.treatment_id = t.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_clinical_records(
    patientRecordId INTEGER,
    diseasesToInsert TEXT[],
    diseasesToRemove TEXT[]
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    diseaseId INTEGER;
    diseaseTitle TEXT;
BEGIN
    FOREACH diseaseTitle IN ARRAY diseasesToInsert
    LOOP
        SELECT id INTO diseaseId
        FROM disease
        WHERE title = diseaseTitle;

        IF diseaseId IS NULL THEN
            RAISE EXCEPTION 'Disease title "%" not found in the disease table', diseaseTitle;
        END IF;

        INSERT INTO clinical_record (patient_record_id, disease_id)
        VALUES (patientRecordId, diseaseId);
    END LOOP;

    FOREACH diseaseTitle IN ARRAY diseasesToRemove
    LOOP
        SELECT id INTO diseaseId
        FROM disease
        WHERE title = diseaseTitle;

        IF diseaseId IS NULL THEN
            RAISE EXCEPTION 'Disease title "%" not found in the disease table', diseaseTitle;
        END IF;

        DELETE FROM clinical_record
        WHERE patient_record_id = patientRecordId
            AND disease_id = diseaseId;
    END LOOP;
END;
$$;

CREATE FUNCTION get_treatments()
RETURNS TABLE (
    id INT,
    title VARCHAR(255),
    cost INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id, t.title, t.cost
    FROM
        treatment t;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION insert_treatment_record(
    treatment_title VARCHAR(255),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    repeat_interval INTERVAL,
    clinical_record_id INT
)
RETURNS VOID AS $$
DECLARE
    treatment_id INT;
BEGIN
    SELECT id INTO treatment_id FROM treatment WHERE title = treatment_title;

    INSERT INTO treatment_record (treatment_id, clinical_record_id, start_date, end_date, repeat_interval)
    VALUES (treatment_id, clinical_record_id, start_date, end_date, repeat_interval);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_treatment_record(
    treatment_record_id INT,
    treatment_title VARCHAR(255),
    start_date_value TIMESTAMP,
    end_date_value TIMESTAMP,
    repeat_interval_value INTERVAL,
    clinical_record_id_value INT
)
RETURNS VOID AS $$
DECLARE
    treatment_id_value INT;
BEGIN
    SELECT id INTO treatment_id_value FROM treatment WHERE title = treatment_title;

    UPDATE treatment_record
    SET treatment_id = treatment_id_value,
        start_date = start_date_value,
        end_date = end_date_value,
        repeat_interval = repeat_interval_value,
        clinical_record_id = clinical_record_id_value
    WHERE id = treatment_record_id;
END;
$$ LANGUAGE plpgsql;