INSERT INTO public.patients (
    patient_name,
    patient_email,
    patient_phone
)
VALUES (
    $1,
    $2,
    $3
)
RETURNING uuid;