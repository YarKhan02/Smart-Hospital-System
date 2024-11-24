SELECT
    appointments.uuid,
    patients.patient_name,
    doctors.doctor_name,
    schedules.appointment_date,
    schedules.appointment_start,
    schedules.appointment_end
FROM public.patients 
JOIN public.appointments ON patients.uuid = appointments.patient_uuid
JOIN public.schedules ON schedules.uuid = appointments.schedule_uuid
JOIN public.doctors ON schedules.doctor_uuid = doctors.uuid
-- WHERE schedules.appointment_date > '2024-10-25'