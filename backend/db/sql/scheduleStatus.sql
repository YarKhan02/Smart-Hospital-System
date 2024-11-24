SELECT appointments.schedule_uuid
FROM public.appointments
WHERE appointments.uuid = $1