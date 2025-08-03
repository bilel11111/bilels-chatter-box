-- Create function to update timestamps (if it doesn't exist)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create quotes table for daily quotes in Arabic and English
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text_en TEXT NOT NULL,
  text_ar TEXT NOT NULL,
  author_en TEXT,
  author_ar TEXT,
  day_of_year INTEGER NOT NULL CHECK (day_of_year >= 1 AND day_of_year <= 366),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Create policy for reading quotes (public access)
CREATE POLICY "Quotes are publicly readable" 
ON public.quotes 
FOR SELECT 
USING (true);

-- Create unique constraint for day of year
CREATE UNIQUE INDEX idx_quotes_day_of_year ON public.quotes(day_of_year);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_quotes_updated_at
BEFORE UPDATE ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();