CREATE FUNCTION patient_records_with_social_status(
    social_status_value VARCHAR(255)
)
RETURNS TABLE (
    full_name VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.full_name,
        pr.admission_date,
        pr.discharge_date
    FROM patient_record pr
    INNER JOIN patient p ON pr.patient_id = p.id
    INNER JOIN social_status s ON p.social_status_id = s.id
    WHERE s.title = social_status_value;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION doctors_at_department(
    department_value VARCHAR(255)
)
RETURNS TABLE (
    full_name VARCHAR(255),
    enrollment_date DATE,
    category VARCHAR(255),
    salary positive_integer
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        doc.full_name,
        doc.enrollment_date,
        doc.category,
        doc.salary
    FROM doctor doc
    INNER JOIN department d ON doc.department_id = d.id
    WHERE d.title = department_value;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION treatment_records_from_date(
    from_date VARCHAR(255)
)
RETURNS TABLE (
    title VARCHAR(255),
    start_date DATE,
    end_date DATE,
    repeat_interval TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.title,
        tr.start_date,
        tr.end_date,
        get_human_readable_interval(tr.repeat_interval) as repeat_interval
    FROM treatment_record tr
    INNER JOIN treatment t ON tr.treatment_id = t.id
    WHERE tr.start_date >= from_date::DATE;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION patient_records_from_date(
    from_date VARCHAR(255)
)
RETURNS TABLE (
    full_name VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.full_name,
        pr.admission_date,
        pr.discharge_date
    FROM patient p
    INNER JOIN patient_record pr ON pr.patient_id = p.id
    WHERE pr.admission_date >= from_date::DATE;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION average_salary()
RETURNS TABLE (
    department VARCHAR(255),
    avg_salary NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        dep.title as department, 
        ROUND(AVG(d.salary), 2) AS avg_salary
    FROM doctor d
    INNER JOIN department dep ON d.department_id = dep.id
    GROUP BY dep.title;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION all_patient_records_info()
RETURNS TABLE (
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
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

CREATE FUNCTION average_length_of_stay_by_department()
RETURNS TABLE (
    department VARCHAR(255),
    avg_length_of_stay INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dep.title as department, 
        ROUND(AVG(pr.discharge_date - pr.admission_date), 0)::INT AS avg_length_of_stay
    FROM patient_record pr
    INNER JOIN doctor d ON pr.doctor_id = d.id
    INNER JOIN department dep ON d.department_id = dep.id
    GROUP BY dep.title;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION doctor_count_by_department()
RETURNS TABLE (
    department VARCHAR(255),
    doctor_count INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.title as department, 
        COUNT(doc.id)::INT AS doctor_count
    FROM department d
    LEFT JOIN doctor doc ON d.id = doc.department_id
    GROUP BY d.title;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION stay_count_by_disease()
RETURNS TABLE (
    disease VARCHAR(255),
    records_count INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.title as disease,
        COUNT(cr.id)::INT as records_count
    FROM clinical_record cr
    RIGHT JOIN disease d ON cr.disease_id = d.id
    GROUP BY d.title;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION patients_with_stay_count_higher_than_average()
RETURNS TABLE (
    full_name VARCHAR(255),
    stay_count INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.full_name,
        SUM(CASE WHEN pr.id IS NOT NULL THEN 1 ELSE 0 END)::INT stay_count
    FROM patient p
    LEFT JOIN patient_record pr ON pr.patient_id = p.id
    GROUP BY p.full_name
    HAVING SUM(CASE WHEN pr.id IS NOT NULL THEN 1 ELSE 0 END)::INT > (
        SELECT AVG(stay_count2)
        FROM (
            SELECT 
                p2.id,
                SUM(CASE WHEN pr2.id IS NOT NULL THEN 1 ELSE 0 END)::INT stay_count2
            FROM patient p2
            LEFT JOIN patient_record pr2 ON pr2.patient_id = p2.id
            GROUP BY p2.id
        ) AS subquery
    );
END;
$$ LANGUAGE plpgsql;