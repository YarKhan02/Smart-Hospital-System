INSERT INTO public.appointments (
    patient_uuid,
    schedule_uuid
) 
VALUES (
    $1,
    $2
)