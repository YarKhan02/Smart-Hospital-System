SELECT 
    appointments.uuid,
    patients.patient_name,
    schedules.appointment_date,
    schedules.appointment_start,
    schedules.appointment_end
FROM public.patients
INNER JOIN public.appointments ON patients.uuid = appointments.patient_uuid
INNER JOIN public.schedules ON schedules.uuid = appointments.schedule_uuid
WHERE schedules.doctor_uuid = $1
  AND schedules.appointment_date > '2024-10-25'
ORDER BY schedules.appointment_date, schedules.appointment_start;
