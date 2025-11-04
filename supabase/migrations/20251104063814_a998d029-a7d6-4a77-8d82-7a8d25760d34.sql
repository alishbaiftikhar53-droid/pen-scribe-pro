-- Add bio field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN bio TEXT DEFAULT '';

-- Add index for performance
CREATE INDEX idx_profiles_user_id ON public.profiles(id);