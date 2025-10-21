import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, ComposedChart } from "recharts";
import { TrendingUp, AlertCircle, CheckCircle, Activity } from "lucide-react";

const forecastData = {
  mustard: {
    current: 5650,
    predicted: 5820,
    range: [5550, 6100],
    risk: "medium",
    confidence: 78,
    data: [
      { date: "Week 1", actual: 5650, predicted: 5680, lower: 5600, upper: 5760 },
      { date: "Week 2", actual: null, predicted: 5720, lower: 5620, upper: 5820 },
      { date: "Week 3", actual: null, predicted: 5780, lower: 5640, upper: 5920 },
      { date: "Week 4", actual: null, predicted: 5820, lower: 5550, upper: 6100 },
    ]
  },
  soybean: {
    current: 4280,
    predicted: 4450,
    range: [4200, 4700],
    risk: "high",
    confidence: 65,
    data: [
      { date: "Week 1", actual: 4280, predicted: 4300, lower: 4200, upper: 4400 },
      { date: "Week 2", actual: null, predicted: 4350, lower: 4220, upper: 4480 },
      { date: "Week 3", actual: null, predicted: 4400, lower: 4240, upper: 4560 },
      { date: "Week 4", actual: null, predicted: 4450, lower: 4200, upper: 4700 },
    ]
  },
  groundnut: {
    current: 6120,
    predicted: 6280,
    range: [6050, 6510],
    risk: "low",
    confidence: 85,
    data: [
      { date: "Week 1", actual: 6120, predicted: 6150, lower: 6080, upper: 6220 },
      { date: "Week 2", actual: null, predicted: 6190, lower: 6100, upper: 6280 },
      { date: "Week 3", actual: null, predicted: 6230, lower: 6120, upper: 6340 },
      { date: "Week 4", actual: null, predicted: 6280, lower: 6050, upper: 6510 },
    ]
  },
  sunflower: {
    current: 6850,
    predicted: 6920,
    range: [6720, 7120],
    risk: "medium",
    confidence: 72,
    data: [
      { date: "Week 1", actual: 6850, predicted: 6870, lower: 6790, upper: 6950 },
      { date: "Week 2", actual: null, predicted: 6890, lower: 6780, upper: 7000 },
      { date: "Week 3", actual: null, predicted: 6910, lower: 6760, upper: 7060 },
      { date: "Week 4", actual: null, predicted: 6920, lower: 6720, upper: 7120 },
    ]
  }
};

const commodityOptions = [
  { value: "mustard", label: "Mustard" },
  { value: "soybean", label: "Soybean" },
  { value: "groundnut", label: "Groundnut" },
  { value: "sunflower", label: "Sunflower" },
];

export default function Forecasting() {
  const [selectedCommodity, setSelectedCommodity] = useState<string>("mustard");
  const forecast = forecastData[selectedCommodity as keyof typeof forecastData];
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-success text-success-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "high": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };
  
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return <CheckCircle className="h-4 w-4" />;
      case "medium": return <Activity className="h-4 w-4" />;
      case "high": return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };
  
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Price Forecasting</h1>
          <p className="text-muted-foreground mt-1">Prophet-based predictions with confidence intervals</p>
        </div>
        
        <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select commodity" />
          </SelectTrigger>
          <SelectContent>
            {commodityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              ₹{forecast.current.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">per quintal</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Predicted (4 weeks)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">
                ₹{forecast.predicted.toLocaleString('en-IN')}
              </p>
              <Badge variant="default" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                {((forecast.predicted - forecast.current) / forecast.current * 100).toFixed(1)}%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Range: ₹{forecast.range[0].toLocaleString('en-IN')} - ₹{forecast.range[1].toLocaleString('en-IN')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className={`${getRiskColor(forecast.risk)} gap-1 text-sm px-3 py-1`}>
                {getRiskIcon(forecast.risk)}
                {forecast.risk.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Confidence:</p>
                <p className="text-lg font-semibold">{forecast.confidence}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>4-Week Price Forecast</CardTitle>
          <CardDescription>
            AI-predicted prices with confidence bands (based on historical volatility)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={forecast.data}>
                <defs>
                  <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="upper" 
                  stroke="none" 
                  fill="url(#confidenceBand)" 
                  name="Upper Bound"
                />
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  stroke="none" 
                  fill="url(#confidenceBand)" 
                  name="Lower Bound"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Actual"
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 5 }}
                  name="Predicted"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-8 bg-muted-foreground rounded"></div>
              <span className="text-muted-foreground">Actual Price</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-8 bg-primary rounded" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 5px, hsl(var(--card)) 5px, hsl(var(--card)) 10px)" }}></div>
              <span className="text-muted-foreground">AI Forecast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-8 bg-primary/20 rounded"></div>
              <span className="text-muted-foreground">Confidence Band (±{100-forecast.confidence}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">📊 How to Read This Forecast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>Predicted Price:</strong> AI model's best estimate for 4 weeks ahead</p>
          <p>• <strong>Confidence Band:</strong> Shows the range where actual price is likely to fall</p>
          <p>• <strong>Risk Index:</strong> Measures price volatility - higher risk = wider price swings</p>
          <p>• <strong>Low Risk:</strong> Stable prices, good for spot sales</p>
          <p>• <strong>Medium/High Risk:</strong> Consider hedging to lock in current prices</p>
        </CardContent>
      </Card>
    </div>
  );
}
