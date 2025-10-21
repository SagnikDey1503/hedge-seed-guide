import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const commodities = [
  { 
    name: "Mustard", 
    price: 5650, 
    change: 2.3,
    unit: "₹/quintal",
    data: [5500, 5520, 5480, 5600, 5580, 5650]
  },
  { 
    name: "Soybean", 
    price: 4280, 
    change: -1.2,
    unit: "₹/quintal",
    data: [4350, 4340, 4300, 4290, 4300, 4280]
  },
  { 
    name: "Groundnut", 
    price: 6120, 
    change: 3.5,
    unit: "₹/quintal",
    data: [5900, 5950, 6000, 6080, 6100, 6120]
  },
  { 
    name: "Sunflower", 
    price: 6850, 
    change: -0.8,
    unit: "₹/quintal",
    data: [6900, 6880, 6870, 6860, 6840, 6850]
  },
];

const spotData = [
  { date: "Jan 1", mustard: 5500, soybean: 4300, groundnut: 5900, sunflower: 6900 },
  { date: "Jan 8", mustard: 5520, soybean: 4280, groundnut: 5950, sunflower: 6880 },
  { date: "Jan 15", mustard: 5480, soybean: 4320, groundnut: 6000, sunflower: 6870 },
  { date: "Jan 22", mustard: 5600, soybean: 4290, groundnut: 6080, sunflower: 6860 },
  { date: "Jan 29", mustard: 5580, soybean: 4300, groundnut: 6100, sunflower: 6840 },
  { date: "Feb 5", mustard: 5650, soybean: 4280, groundnut: 6120, sunflower: 6850 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Market Activity</h1>
        <p className="text-muted-foreground mt-1">Virtual oilseed commodity prices and trends</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {commodities.map((commodity) => {
          const isPositive = commodity.change > 0;
          const chartData = commodity.data.map((value, i) => ({ value, index: i }));
          
          return (
            <Card key={commodity.name} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold">{commodity.name}</CardTitle>
                  <Badge 
                    variant={isPositive ? "default" : "destructive"}
                    className="gap-1"
                  >
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(commodity.change)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-3xl font-bold text-foreground">
                      {commodity.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-muted-foreground">{commodity.unit}</p>
                  </div>
                  <div className="h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={isPositive ? "hsl(var(--chart-gain))" : "hsl(var(--chart-loss))"} 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Price Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="spot" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="spot">Spot Prices</TabsTrigger>
              <TabsTrigger value="futures">Futures (Virtual)</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="hedged">Hedged P&L</TabsTrigger>
            </TabsList>
            
            <TabsContent value="spot" className="h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spotData}>
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line type="monotone" dataKey="mustard" stroke="hsl(var(--primary))" strokeWidth={2} name="Mustard" />
                  <Line type="monotone" dataKey="soybean" stroke="hsl(var(--chart-neutral))" strokeWidth={2} name="Soybean" />
                  <Line type="monotone" dataKey="groundnut" stroke="hsl(var(--chart-gain))" strokeWidth={2} name="Groundnut" />
                  <Line type="monotone" dataKey="sunflower" stroke="hsl(var(--accent))" strokeWidth={2} name="Sunflower" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="futures" className="flex items-center justify-center h-80">
              <p className="text-muted-foreground">Virtual futures data coming soon...</p>
            </TabsContent>
            
            <TabsContent value="forecast" className="flex items-center justify-center h-80">
              <p className="text-muted-foreground">Navigate to Forecasting section for AI predictions</p>
            </TabsContent>
            
            <TabsContent value="hedged" className="flex items-center justify-center h-80">
              <p className="text-muted-foreground">Navigate to Hedging Simulator for P&L analysis</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
