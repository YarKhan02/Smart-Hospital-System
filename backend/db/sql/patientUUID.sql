SELECT appointments.patient_uuid
FROM public.appointments
WHERE appointments.uuid = $1