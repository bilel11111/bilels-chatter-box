import DailyQuote from "@/components/quotes/DailyQuote";

const Quotes = () => {
  return (
    <div className="h-full bg-gradient-chat p-4">
      <div className="max-w-6xl mx-auto">
        <DailyQuote />
      </div>
    </div>
  );
};

export default Quotes;