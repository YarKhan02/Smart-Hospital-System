WITH existing_patient AS (
    SELECT uuid
    FROM public.patients
    WHERE user_name = $1
    AND phone_number = $2
)
INSERT INTO public.patients (patient_name, patient_email, patient_phone)
SELECT $1, $3, $2
WHERE NOT EXISTS (SELECT 1 FROM existing_patient)
RETURNING uuid;