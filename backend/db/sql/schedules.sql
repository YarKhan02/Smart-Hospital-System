SELECT
    schedules.uuid,
    doctors.doctor_name,
    doctors.speciality,
    schedules.appointment_date,
    schedules.appointment_start,
    schedules.appointment_end
FROM public.doctors JOIN public.schedules ON doctors.uuid = schedules.doctor_uuid
WHERE schedules.status = 'Available'