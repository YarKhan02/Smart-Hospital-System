INSERT INTO public.medications (
    appointment_uuid, 
    medicine, 
    dosage, 
    frequency, 
    duration, 
    description_uuid
) 
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
);