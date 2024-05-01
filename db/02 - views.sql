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