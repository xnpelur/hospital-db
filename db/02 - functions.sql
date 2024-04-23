SET client_encoding TO 'utf8';

CREATE FUNCTION get_patients()
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        pr.id,
        p.full_name,
        p.birth_date,
        s.title as social_status,
        pr.admission_date,
        pr.discharge_date
    FROM
        public.patient_record pr
    LEFT JOIN
        public.patient p ON pr.patient_id = p.id
    LEFT JOIN
        public.social_status s ON p.social_status_id = s.id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_current_patients()
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        pr.id,
        p.full_name,
        p.birth_date,
        s.title as social_status,
        pr.admission_date,
        pr.discharge_date
    FROM
        public.patient_record pr
    LEFT JOIN
        public.patient p ON pr.patient_id = p.id
    LEFT JOIN
        public.social_status s ON p.social_status_id = s.id
    WHERE
        pr.admission_date <= CURRENT_DATE
        AND pr.discharge_date >= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_patient_by_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        pr.id,
        p.full_name,
        p.birth_date,
        s.title as social_status,
        pr.admission_date,
        pr.discharge_date
    FROM
        public.patient_record pr
    LEFT JOIN
        public.patient p ON pr.patient_id = p.id
    LEFT JOIN
        public.social_status s ON p.social_status_id = s.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_diseases_by_patient_record_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    title VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        d.id,
        d.title
    FROM
        public.clinical_record cr
    LEFT JOIN
        public.patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        public.disease d ON cr.disease_id = d.id
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

CREATE FUNCTION get_treatments_by_patient_record_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    title VARCHAR(255),
    cost INT,
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
        t.cost,
        tr.start_date,
        tr.end_date,
        get_human_readable_interval(tr.repeat_interval) as repeat_interval,
        d.title as disease
    FROM
        public.treatment_record tr
    LEFT JOIN
        public.clinical_record cr ON tr.clinical_record_id = cr.id
    LEFT JOIN
        public.patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        public.disease d ON cr.disease_id = d.id
    LEFT JOIN
        public.treatment t ON tr.treatment_id = t.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;