INSERT INTO public.staffs (
    email, 
    password
)
VALUES (
    $1,
    $2
)
RETURNING uuid;