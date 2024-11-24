UPDATE public.appointments
SET schedule_uuid = $2
WHERE uuid = $1
