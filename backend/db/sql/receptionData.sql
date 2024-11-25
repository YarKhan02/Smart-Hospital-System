WITH total_patients AS (
  SELECT COUNT(*) AS total FROM public.patients
),
total_doctors AS (
  SELECT COUNT(*) AS total FROM public.doctors
),
total_future_appointments AS (
  SELECT COUNT(*) AS total
  FROM public.appointments a
  JOIN public.schedules s ON a.schedule_uuid = s.uuid
  WHERE s.appointment_date >= CURRENT_DATE 
    AND CAST(s.appointment_start AS TIME) >= CURRENT_TIME
)
SELECT
  (SELECT total FROM total_patients) AS total_patients,
  (SELECT total FROM total_doctors) AS total_doctors,
  (SELECT total FROM total_future_appointments) AS total_future_appointments;