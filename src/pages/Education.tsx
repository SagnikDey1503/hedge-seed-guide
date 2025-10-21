import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Lock, BookOpen, Target, AlertTriangle } from "lucide-react";

const sections = [
  {
    title: "Hedging 101",
    icon: Shield,
    color: "text-primary",
    topics: [
      {
        question: "What is Hedging?",
        answer: "Hedging is a risk management strategy used to protect against unfavorable price movements. For farmers, it means locking in a selling price before harvest to avoid losses if market prices drop."
      },
      {
        question: "How Do Futures Work?",
        answer: "Futures contracts allow you to agree on a price today for delivery in the future. This protects you from price volatility. Example: If you lock mustard at ₹5,500/quintal and prices drop to ₹5,200, you still get ₹5,500."
      },
      {
        question: "Why Does It Matter?",
        answer: "Oilseed prices fluctuate due to weather, demand, and global markets. Hedging ensures stable income and helps plan finances better, reducing the risk of selling at a loss."
      }
    ]
  },
  {
    title: "Forecasting Basics",
    icon: TrendingUp,
    color: "text-chart-gain",
    topics: [
      {
        question: "What is AI Forecasting?",
        answer: "Our system uses machine learning models (Prophet/LSTM) trained on historical price data, weather patterns, and market indicators to predict future prices with confidence bands."
      },
      {
        question: "Understanding Confidence Bands",
        answer: "The shaded area around predictions shows the likely price range. Wider bands = higher uncertainty. Narrower bands = more confident predictions. Use this to assess risk."
      },
      {
        question: "How to Use Forecasts?",
        answer: "If AI predicts price drops, consider hedging. If it predicts gains with low risk, you might skip hedging. Always compare hedged vs unhedged scenarios in the simulator."
      }
    ]
  },
  {
    title: "Blockchain for Agriculture",
    icon: Lock,
    color: "text-accent",
    topics: [
      {
        question: "What is Blockchain?",
        answer: "Blockchain is a secure, tamper-proof digital ledger. Once a contract is logged, no one can alter it without detection. This builds trust between buyers and sellers."
      },
      {
        question: "How Are Contracts Secured?",
        answer: "When you create an e-contract, it's hashed (converted to a unique code) and logged on the Polygon blockchain. Both parties receive this hash as proof of agreement."
      },
      {
        question: "Benefits for Farmers",
        answer: "Blockchain prevents disputes, ensures transparency, and provides legal proof of agreements. Buyers can't change terms, and sellers can verify authenticity anytime."
      }
    ]
  }
];

const bestPractices = [
  { title: "Monitor Forecasts Weekly", description: "Check AI predictions regularly to spot trend changes early" },
  { title: "Diversify Hedging", description: "Don't hedge 100% - keep some unhedged for upside potential" },
  { title: "Understand Risk Levels", description: "High risk = consider hedging. Low risk = may skip hedging" },
  { title: "Verify Blockchain Contracts", description: "Always save and verify your contract hash for security" },
];

export default function Education() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Training & Education</h1>
        <p className="text-muted-foreground mt-1">Learn hedging strategies and smart farming practices</p>
      </div>
      
      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${section.color}`} />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.topics.map((topic, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      {topic.question}
                    </h3>
                    <p className="text-muted-foreground text-sm pl-6">
                      {topic.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {bestPractices.map((practice, idx) => (
              <div key={idx} className="flex gap-3 p-3 rounded-lg bg-background">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{practice.title}</p>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-destructive/5 border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Important Disclaimers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>Simulation Only:</strong> This platform does not execute real trades or handle money</p>
          <p>• <strong>Educational Purpose:</strong> Forecasts are for learning and strategy testing, not financial advice</p>
          <p>• <strong>No Guarantees:</strong> AI predictions are estimates based on historical data - actual prices may vary</p>
          <p>• <strong>Consult Experts:</strong> For real hedging decisions, consult licensed commodity brokers or financial advisors</p>
        </CardContent>
      </Card>
    </div>
  );
}
