SELECT
    schedules.uuid
FROM public.schedules 
JOIN public.doctors ON schedules.uuid = doctors.uuid
WHERE 
    doctors.doctor_name = $1 AND
    doctors.speciality = $2 AND
    schedules.appointment_date = $3 AND
    schedules.appointment_start = $4 AND
    schedules.appointment_end = $5