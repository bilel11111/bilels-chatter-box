import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quote, Shuffle, Calendar, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QuoteData {
  id: string;
  text_en: string;
  text_ar: string;
  author_en: string;
  author_ar: string;
  day_of_year: number;
}

export const DailyQuotes = () => {
  const [todayQuote, setTodayQuote] = useState<QuoteData | null>(null);
  const [randomQuote, setRandomQuote] = useState<QuoteData | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Get current day of year (1-366)
  const getCurrentDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const fetchTodayQuote = async () => {
    const dayOfYear = getCurrentDayOfYear();
    
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('day_of_year', dayOfYear)
      .maybeSingle();

    if (error) {
      console.error('Error fetching today quote:', error);
      toast({
        title: "Error",
        description: "Failed to load today's quote",
        variant: "destructive",
      });
    } else {
      setTodayQuote(data);
    }
  };

  const fetchRandomQuote = async () => {
    const randomDay = Math.floor(Math.random() * 100) + 1; // Random day from 1-100
    
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('day_of_year', randomDay)
      .maybeSingle();

    if (error) {
      console.error('Error fetching random quote:', error);
      // Fallback to day 1 if random fails
      const { data: fallbackData } = await supabase
        .from('quotes')
        .select('*')
        .eq('day_of_year', 1)
        .maybeSingle();
      setRandomQuote(fallbackData);
    } else {
      setRandomQuote(data);
    }
  };

  const getNewRandomQuote = () => {
    fetchRandomQuote();
    toast({
      title: "New Quote",
      description: "Here's a new inspirational quote for you!",
    });
  };

  useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      await Promise.all([fetchTodayQuote(), fetchRandomQuote()]);
      setLoading(false);
    };
    
    loadQuotes();
  }, []);

  const QuoteCard = ({ quote, title, icon: Icon, action }: {
    quote: QuoteData | null;
    title: string;
    icon: any;
    action?: () => void;
  }) => (
    <Card className="h-full shadow-lg border-primary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <Icon className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        {action && (
          <Button variant="outline" size="sm" onClick={action} className="mt-2">
            <Shuffle className="w-4 h-4 mr-1" />
            New Quote
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : quote ? (
          <>
            <Tabs value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ar')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="en" className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  English
                </TabsTrigger>
                <TabsTrigger value="ar" className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  العربية
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="en" className="space-y-4">
                <blockquote className="text-lg italic text-foreground leading-relaxed">
                  "{quote.text_en}"
                </blockquote>
                <div className="flex justify-between items-center">
                  <cite className="text-primary font-semibold">— {quote.author_en}</cite>
                  <Badge variant="secondary">Day {quote.day_of_year}</Badge>
                </div>
              </TabsContent>
              
              <TabsContent value="ar" className="space-y-4">
                <blockquote 
                  className="text-lg italic text-foreground leading-relaxed text-right" 
                  dir="rtl"
                >
                  "{quote.text_ar}"
                </blockquote>
                <div className="flex justify-between items-center">
                  <cite className="text-primary font-semibold">— {quote.author_ar}</cite>
                  <Badge variant="secondary">يوم {quote.day_of_year}</Badge>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center text-muted-foreground">No quote available</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Daily Inspiration</h2>
        <p className="text-muted-foreground">
          Start your day with wisdom from great minds, available in English and Arabic
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <QuoteCard 
          quote={todayQuote}
          title="Today's Quote"
          icon={Calendar}
        />
        
        <QuoteCard 
          quote={randomQuote}
          title="Random Quote"
          icon={Quote}
          action={getNewRandomQuote}
        />
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>✨ New quotes are added daily. Come back tomorrow for fresh inspiration!</p>
      </div>
    </div>
  );
};