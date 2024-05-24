CREATE OR REPLACE VIEW patient_records_view AS
SELECT
    pr.id,
    p.full_name,
    p.birth_date,
    s.title as social_status,
    pr.admission_date,
    pr.discharge_date,
    CASE
        WHEN pr.discharge_date < CURRENT_DATE THEN 'Выписан'
        WHEN NOT EXISTS (SELECT 1 FROM public.clinical_record cr WHERE cr.patient_record_id = pr.id) THEN 'К оформлению'
        ELSE 'На лечении'
    END AS status,
    p.username
FROM
    public.patient_record pr
LEFT JOIN
    public.patient p ON pr.patient_id = p.id
LEFT JOIN
    public.social_status s ON p.social_status_id = s.id;

ALTER VIEW patient_records_view SET (security_invoker = on);

CREATE VIEW treatment_with_dependencies AS
SELECT 
	t.id,
	t.title,
	t.cost,
	SUM(CASE WHEN tr.id IS NOT NULL THEN 1 ELSE 0 END)::INT as dependencies
FROM treatment t
LEFT JOIN treatment_record tr ON tr.treatment_id = t.id
GROUP BY t.id, t.title, t.cost;

CREATE VIEW disease_with_dependencies AS
SELECT 
	d.id,
    d.title,
	SUM(CASE WHEN cr.id IS NOT NULL THEN 1 ELSE 0 END)::INT as dependencies
FROM disease d
LEFT JOIN clinical_record cr ON cr.disease_id = d.id
GROUP BY d.id, d.title;

CREATE VIEW department_with_dependencies AS
SELECT 
	d.id,
    d.title,
    d.beds_number,
    d.phone,
	SUM(CASE WHEN doc.id IS NOT NULL THEN 1 ELSE 0 END)::INT as dependencies
FROM department d
LEFT JOIN doctor doc ON doc.department_id = d.id
GROUP BY d.id, d.title, d.beds_number, d.phone;

CREATE VIEW social_status_with_dependencies AS
SELECT 
	s.id,
    s.title,
	SUM(CASE WHEN p.id IS NOT NULL THEN 1 ELSE 0 END)::INT as dependencies
FROM social_status s
LEFT JOIN patient p ON p.social_status_id = s.id
GROUP BY s.id, s.title;

CREATE VIEW doctor_with_dependencies AS
SELECT 
	d.id,
    d.full_name,
    dep.title as department,
    d.enrollment_date,
    d.category,
    d.salary,
    d.username,
	SUM(CASE WHEN pr.id IS NOT NULL THEN 1 ELSE 0 END)::INT as dependencies
FROM doctor d
LEFT JOIN patient_record pr ON pr.doctor_id = d.id
JOIN department dep ON d.department_id = dep.id
GROUP BY d.id, d.full_name, department, d.enrollment_date, d.category, d.salary, d.username;

CREATE VIEW patient_with_dependencies AS
SELECT
    p.id,
    p.full_name,
    p.birth_date,
    s.title as social_status,
    p.username,
    SUM(CASE WHEN pr.id IS NOT NULL THEN 1 ELSE 0 END)::INT as dependencies
FROM patient p
LEFT JOIN patient_record pr ON pr.patient_id = p.id
JOIN social_status s ON p.social_status_id = s.id
GROUP BY p.id, p.full_name, p.birth_date, social_status, p.username;