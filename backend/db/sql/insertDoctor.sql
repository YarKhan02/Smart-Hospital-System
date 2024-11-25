INSERT INTO public.doctors (
    uuid,
    doctor_name, 
    speciality, 
    email, 
    phone_number)
VALUES (
    $1, 
    $2, 
    $3, 
    $4, 
    $5
);