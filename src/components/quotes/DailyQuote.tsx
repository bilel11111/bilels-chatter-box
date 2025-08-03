import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quote, RefreshCw, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface QuoteData {
  id: string;
  text_en: string;
  text_ar: string;
  author_en: string | null;
  author_ar: string | null;
  day_of_year: number;
}

const DailyQuote = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [loading, setLoading] = useState(true);

  const getCurrentDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const fetchTodaysQuote = async () => {
    try {
      setLoading(true);
      const dayOfYear = getCurrentDayOfYear();
      
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('day_of_year', dayOfYear)
        .maybeSingle();

      if (error) {
        console.error('Error fetching quote:', error);
        toast({
          title: "Error",
          description: "Failed to fetch today's quote",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setQuote(data);
      } else {
        // Fallback to a random quote if no quote for today
        const { data: randomData, error: randomError } = await supabase
          .from('quotes')
          .select('*')
          .limit(1);
          
        if (randomError) {
          console.error('Error fetching random quote:', randomError);
        } else if (randomData && randomData.length > 0) {
          setQuote(randomData[0]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quote",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      
      // Get a random quote by generating a random day of year
      const randomDay = Math.floor(Math.random() * 365) + 1;
      
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('day_of_year', randomDay)
        .maybeSingle();

      if (error) {
        console.error('Error fetching random quote:', error);
        toast({
          title: "Error",
          description: "Failed to fetch random quote",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setQuote(data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quote",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysQuote();
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const currentText = quote ? (language === "en" ? quote.text_en : quote.text_ar) : "";
  const currentAuthor = quote ? (language === "en" ? quote.author_en : quote.author_ar) : "";

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Daily Quotes</h1>
        <p className="text-muted-foreground">Inspiration for every day</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Quote className="h-5 w-5 text-primary" />
              Quote of the Day
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={language === "en" ? "default" : "outline"}>
                {language === "en" ? "English" : "العربية"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                {language === "en" ? "AR" : "EN"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading quote...</p>
            </div>
          ) : quote ? (
            <div className={`space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}>
              <blockquote className={`text-lg font-medium text-foreground leading-relaxed ${language === "ar" ? "font-arabic" : ""}`}>
                "{currentText}"
              </blockquote>
              {currentAuthor && (
                <footer className="text-muted-foreground">
                  — {currentAuthor}
                </footer>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No quote available</p>
            </div>
          )}
          
          <div className="flex justify-center">
            <Button
              onClick={fetchRandomQuote}
              variant="outline"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Random Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyQuote;