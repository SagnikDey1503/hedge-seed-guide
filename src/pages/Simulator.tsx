import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Lock, Unlock, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const commodityOptions = [
  { value: "mustard", label: "Mustard", currentPrice: 5650, predictedPrice: 5820 },
  { value: "soybean", label: "Soybean", currentPrice: 4280, predictedPrice: 4450 },
  { value: "groundnut", label: "Groundnut", currentPrice: 6120, predictedPrice: 6280 },
  { value: "sunflower", label: "Sunflower", currentPrice: 6850, predictedPrice: 6920 },
];

export default function Simulator() {
  const { toast } = useToast();
  const [selectedCommodity, setSelectedCommodity] = useState("mustard");
  const [quantity, setQuantity] = useState("100");
  const [lockPrice, setLockPrice] = useState("");
  const [simulation, setSimulation] = useState<any>(null);
  
  const commodity = commodityOptions.find(c => c.value === selectedCommodity);
  
  const runSimulation = () => {
    if (!quantity || !lockPrice) {
      toast({
        title: "Missing inputs",
        description: "Please enter quantity and lock price",
        variant: "destructive",
      });
      return;
    }
    
    const qty = parseFloat(quantity);
    const locked = parseFloat(lockPrice);
    const predicted = commodity?.predictedPrice || 0;
    
    // Calculate scenarios
    const hedgedRevenue = locked * qty;
    const unhedgedRevenue = predicted * qty;
    const hedgedProfit = hedgedRevenue - (commodity?.currentPrice || 0) * qty;
    const unhedgedProfit = unhedgedRevenue - (commodity?.currentPrice || 0) * qty;
    
    const comparisonData = [
      {
        scenario: "Hedged",
        revenue: hedgedRevenue,
        profit: hedgedProfit,
      },
      {
        scenario: "Unhedged",
        revenue: unhedgedRevenue,
        profit: unhedgedProfit,
      },
    ];
    
    setSimulation({
      commodity: commodity?.label,
      quantity: qty,
      lockedPrice: locked,
      predictedPrice: predicted,
      hedgedRevenue,
      unhedgedRevenue,
      hedgedProfit,
      unhedgedProfit,
      difference: unhedgedProfit - hedgedProfit,
      comparisonData,
    });
    
    toast({
      title: "Simulation complete",
      description: `Compared hedged vs unhedged scenarios for ${commodity?.label}`,
    });
  };
  
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Virtual Hedging Simulator</h1>
        <p className="text-muted-foreground mt-1">Test hedging strategies without real money</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Simulation Parameters</CardTitle>
            <CardDescription>Configure your hedging scenario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="commodity">Select Commodity</Label>
              <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                <SelectTrigger id="commodity">
                  <SelectValue />
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Current Price</Label>
                <p className="text-lg font-semibold">₹{commodity?.currentPrice.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">AI Predicted (4w)</Label>
                <p className="text-lg font-semibold text-primary">₹{commodity?.predictedPrice.toLocaleString('en-IN')}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (quintals)</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lockPrice">Lock-In Price (₹/quintal)</Label>
              <Input
                id="lockPrice"
                type="number"
                value={lockPrice}
                onChange={(e) => setLockPrice(e.target.value)}
                placeholder="Price to hedge at"
              />
              <p className="text-xs text-muted-foreground">
                Suggested: Current price ±2%
              </p>
            </div>
            
            <Button onClick={runSimulation} className="w-full gap-2">
              <TrendingUp className="h-4 w-4" />
              Run Simulation
            </Button>
          </CardContent>
        </Card>
        
        {simulation && (
          <Card>
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
              <CardDescription>{simulation.commodity} • {simulation.quantity} quintals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Hedged Scenario
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{simulation.hedgedRevenue.toLocaleString('en-IN')}
                  </p>
                  <Badge variant={simulation.hedgedProfit >= 0 ? "default" : "destructive"} className="text-xs">
                    Profit: ₹{simulation.hedgedProfit.toLocaleString('en-IN')}
                  </Badge>
                </div>
                
                <div className="space-y-1 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Unlock className="h-4 w-4" />
                    Unhedged Scenario
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{simulation.unhedgedRevenue.toLocaleString('en-IN')}
                  </p>
                  <Badge variant={simulation.unhedgedProfit >= 0 ? "default" : "destructive"} className="text-xs">
                    Profit: ₹{simulation.unhedgedProfit.toLocaleString('en-IN')}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Net Difference</p>
                  <div className="flex items-center gap-2">
                    {simulation.difference > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-lg font-bold text-success">
                          +₹{Math.abs(simulation.difference).toLocaleString('en-IN')}
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-lg font-bold text-destructive">
                          -₹{Math.abs(simulation.difference).toLocaleString('en-IN')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {simulation.difference > 0 
                    ? "Unhedged strategy yields better returns if prediction holds"
                    : "Hedged strategy protects against price drops"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {simulation && (
        <Card>
          <CardHeader>
            <CardTitle>Profit Comparison</CardTitle>
            <CardDescription>Visual comparison of hedged vs unhedged profits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={simulation.comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="scenario" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Total Revenue (₹)" />
                  <Bar dataKey="profit" fill="hsl(var(--chart-gain))" name="Net Profit (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">💡 Understanding Hedging</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>Hedged:</strong> Lock in a price now to protect against future drops</p>
          <p>• <strong>Unhedged:</strong> Sell at market price later, potentially higher or lower</p>
          <p>• <strong>Use hedging when:</strong> AI forecast shows downward trend or high volatility</p>
          <p>• <strong>Skip hedging when:</strong> Forecast shows strong upward trend with low risk</p>
        </CardContent>
      </Card>
    </div>
  );
}
