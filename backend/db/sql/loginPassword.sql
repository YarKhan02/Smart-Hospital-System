SELECT uuid, password
FROM public.staffs
WHERE email = $1;