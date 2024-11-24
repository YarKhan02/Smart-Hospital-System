UPDATE public.schedules
SET status = 'Booked'
WHERE uuid = $1