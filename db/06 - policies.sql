CREATE POLICY doctor_select ON social_status FOR SELECT TO doctor USING (true);
CREATE POLICY doctor_select ON patient FOR SELECT TO doctor USING (true);
CREATE POLICY doctor_select ON department FOR SELECT TO doctor USING (true);
CREATE POLICY doctor_select ON doctor FOR SELECT TO doctor USING (username = current_user);
CREATE POLICY doctor_all ON patient_record TO doctor USING (EXISTS (
    SELECT 1
    FROM doctor
    WHERE doctor.id = patient_record.doctor_id
        AND doctor.username = current_user
));
CREATE POLICY doctor_select ON disease FOR SELECT TO doctor USING (true);
CREATE POLICY doctor_select ON treatment FOR SELECT TO doctor USING (true);
CREATE POLICY doctor_all ON clinical_record TO doctor USING (EXISTS (
    SELECT 1
    FROM patient_record
    WHERE patient_record.id = clinical_record.patient_record_id
    AND patient_record.doctor_id = (
        SELECT id
        FROM doctor
        WHERE doctor.username = current_user
    )
));
CREATE POLICY doctor_all ON treatment_record TO doctor USING (
    EXISTS (
        SELECT 1
        FROM clinical_record
        JOIN patient_record ON clinical_record.patient_record_id = patient_record.id
        WHERE treatment_record.clinical_record_id = clinical_record.id
        AND patient_record.doctor_id = (
            SELECT id
            FROM doctor
            WHERE doctor.username = current_user
        )
    )
);

CREATE POLICY patient_select ON social_status FOR SELECT TO patient USING (true);
CREATE POLICY patient_select ON patient FOR SELECT TO patient USING (true);
CREATE POLICY patient_select ON department FOR SELECT TO patient USING (true);
CREATE POLICY patient_select ON doctor FOR SELECT TO patient USING (true);
CREATE POLICY patient_select ON patient_record FOR SELECT TO patient USING (true);
CREATE POLICY patient_select ON disease FOR SELECT TO patient USING (true);
CREATE POLICY patient_select ON treatment FOR SELECT TO patient USING (true);
CREATE POLICY patient_select ON clinical_record FOR SELECT TO patient USING (true);
CREATE POLICY patient_select ON treatment_record FOR SELECT TO patient USING (true);

CREATE POLICY admin_select ON social_status FOR SELECT TO admin USING (true);
CREATE POLICY admin_select ON patient FOR SELECT TO admin USING (true);
CREATE POLICY admin_select ON department FOR SELECT TO admin USING (true);
CREATE POLICY admin_select ON doctor FOR SELECT TO admin USING (true);
CREATE POLICY admin_select ON patient_record FOR SELECT TO admin USING (true);
CREATE POLICY admin_select ON disease FOR SELECT TO admin USING (true);
CREATE POLICY admin_select ON treatment FOR SELECT TO admin USING (true);
CREATE POLICY admin_select ON clinical_record FOR SELECT TO admin USING (true);
CREATE POLICY admin_select ON treatment_record FOR SELECT TO admin USING (true);