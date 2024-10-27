SELECT
    appointments.appointment_uuid,
    patients.patient_name,
    schedules.appointment_date,
    schedules.appointment_start,
    schedules.appointment_end
FROM public.patients 
JOIN public.appointments ON patients.uuid = appointments.patient_uuid
JOIN public.schedules ON schedules.uuid = appointments.schedule_uuid
WHERE schedules.appointment_date > '2024-10-25'