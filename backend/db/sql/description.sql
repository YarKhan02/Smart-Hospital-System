INSERT INTO public.descriptions (
    diagnosis, 
    notes
) 
VALUES (
    $1, 
    $2
)
RETURNING uuid;
