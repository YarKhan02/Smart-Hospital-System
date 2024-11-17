SELECT 
    schedules.appointment_date,
    descriptions.diagnosis,
    descriptions.notes,
    json_agg(
        json_build_object(
            'medicine', medications.medicine,
            'frequency', medications.frequency,
            'dosage', medications.dosage,
            'duration', medications.duration
        )
    ) AS medicines
FROM 
    public.appointments
JOIN 
    public.schedules ON appointments.schedule_uuid = schedules.uuid
JOIN 
    public.descriptions ON descriptions.uuid = (
        SELECT description_uuid 
        FROM public.medications 
        WHERE appointment_uuid = appointments.uuid 
        LIMIT 1
    )
LEFT JOIN 
    public.medications ON medications.appointment_uuid = appointments.uuid
WHERE 
    appointments.patient_uuid = $1
GROUP BY 
    schedules.appointment_date, descriptions.diagnosis, descriptions.notes
ORDER BY 
    schedules.appointment_date DESC;
