import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart } from "recharts";
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity, TrendingUpIcon } from "lucide-react";

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

const volumeData = [
  { date: "Jan 1", mustard: 1200, soybean: 2100, groundnut: 850, sunflower: 950 },
  { date: "Jan 8", mustard: 1350, soybean: 2250, groundnut: 920, sunflower: 1020 },
  { date: "Jan 15", mustard: 1180, soybean: 2050, groundnut: 890, sunflower: 980 },
  { date: "Jan 22", mustard: 1520, soybean: 2400, groundnut: 1100, sunflower: 1150 },
  { date: "Jan 29", mustard: 1450, soybean: 2300, groundnut: 980, sunflower: 1080 },
  { date: "Feb 5", mustard: 1680, soybean: 2550, groundnut: 1200, sunflower: 1250 },
];

const volatilityData = [
  { commodity: "Mustard", volatility: 3.2, avgPrice: 5565, priceRange: 170 },
  { commodity: "Soybean", volatility: 2.8, avgPrice: 4295, priceRange: 120 },
  { commodity: "Groundnut", volatility: 4.1, avgPrice: 6008, priceRange: 220 },
  { commodity: "Sunflower", volatility: 1.9, avgPrice: 6867, priceRange: 60 },
];

const marketShareData = [
  { name: "Soybean", value: 42, fill: "hsl(var(--chart-neutral))" },
  { name: "Mustard", value: 28, fill: "hsl(var(--primary))" },
  { name: "Groundnut", value: 18, fill: "hsl(var(--chart-gain))" },
  { name: "Sunflower", value: 12, fill: "hsl(var(--accent))" },
];

const priceSpreadData = [
  { week: "Week 1", high: 6950, low: 4280, avg: 5650 },
  { week: "Week 2", high: 6920, low: 4260, avg: 5625 },
  { week: "Week 3", high: 6900, low: 4300, avg: 5663 },
  { week: "Week 4", high: 6880, low: 4270, avg: 5708 },
  { week: "Week 5", high: 6860, low: 4280, avg: 5718 },
];

const tradingActivityData = [
  { day: "Mon", transactions: 145, volume: 8500 },
  { day: "Tue", transactions: 168, volume: 9200 },
  { day: "Wed", transactions: 142, volume: 8100 },
  { day: "Thu", transactions: 189, volume: 10500 },
  { day: "Fri", transactions: 203, volume: 11200 },
  { day: "Sat", transactions: 95, volume: 5400 },
];

const performanceMetrics = [
  { metric: "Price Stability", value: 78, fullMark: 100 },
  { metric: "Liquidity", value: 85, fullMark: 100 },
  { metric: "Volume", value: 72, fullMark: 100 },
  { metric: "Market Depth", value: 68, fullMark: 100 },
  { metric: "Volatility Control", value: 81, fullMark: 100 },
];

const futuresData = [
  { date: "Feb 12", mustard: 5720, soybean: 4350, groundnut: 6200, sunflower: 6920 },
  { date: "Feb 19", mustard: 5780, soybean: 4380, groundnut: 6250, sunflower: 6950 },
  { date: "Feb 26", mustard: 5850, soybean: 4420, groundnut: 6320, sunflower: 7000 },
  { date: "Mar 5", mustard: 5920, soybean: 4450, groundnut: 6380, sunflower: 7050 },
  { date: "Mar 12", mustard: 6000, soybean: 4500, groundnut: 6450, sunflower: 7100 },
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
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="mustard" stroke="hsl(var(--primary))" strokeWidth={2} name="Mustard" />
                  <Line type="monotone" dataKey="soybean" stroke="hsl(var(--chart-neutral))" strokeWidth={2} name="Soybean" />
                  <Line type="monotone" dataKey="groundnut" stroke="hsl(var(--chart-gain))" strokeWidth={2} name="Groundnut" />
                  <Line type="monotone" dataKey="sunflower" stroke="hsl(var(--accent))" strokeWidth={2} name="Sunflower" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="futures" className="h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={futuresData}>
                  <defs>
                    <linearGradient id="colorMustard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSoybean" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-neutral))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-neutral))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="mustard" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorMustard)" name="Mustard" />
                  <Area type="monotone" dataKey="soybean" stroke="hsl(var(--chart-neutral))" fillOpacity={1} fill="url(#colorSoybean)" name="Soybean" />
                  <Area type="monotone" dataKey="groundnut" stroke="hsl(var(--chart-gain))" fillOpacity={0.2} fill="hsl(var(--chart-gain))" name="Groundnut" />
                </AreaChart>
              </ResponsiveContainer>
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

      {/* Volume Analysis */}
      <Card className="-mt-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Trading Volume Analysis
          </CardTitle>
          <CardDescription>Daily trading volumes across commodities (in quintals)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value: number) => `${value} quintals`}
              />
              <Legend />
              <Bar dataKey="mustard" fill="hsl(var(--primary))" name="Mustard" radius={[4, 4, 0, 0]} />
              <Bar dataKey="soybean" fill="hsl(var(--chart-neutral))" name="Soybean" radius={[4, 4, 0, 0]} />
              <Bar dataKey="groundnut" fill="hsl(var(--chart-gain))" name="Groundnut" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sunflower" fill="hsl(var(--accent))" name="Sunflower" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two column grid for smaller charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Market Share */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Market Share Distribution
            </CardTitle>
            <CardDescription>Trading volume distribution by commodity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={90}
                  dataKey="value"
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Volatility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Price Volatility Index
            </CardTitle>
            <CardDescription>Volatility percentage by commodity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={volatilityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="commodity" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value: number) => `${value}%`}
                />
                <Bar dataKey="volatility" fill="hsl(var(--destructive))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Price Spread Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5" />
            Weekly Price Spread Analysis
          </CardTitle>
          <CardDescription>High, Low, and Average prices across all commodities</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={priceSpreadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Legend />
              <Bar dataKey="high" fill="hsl(var(--chart-gain))" name="High Price" radius={[4, 4, 0, 0]} />
              <Bar dataKey="low" fill="hsl(var(--destructive))" name="Low Price" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={3} name="Average" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two column grid for activity charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Trading Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Daily Trading Activity
            </CardTitle>
            <CardDescription>Transactions and volume by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={tradingActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="transactions" fill="hsl(var(--primary))" name="Transactions" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="volume" stroke="hsl(var(--chart-gain))" strokeWidth={2} name="Volume" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Market Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Market Performance Metrics
            </CardTitle>
            <CardDescription>Overall market health indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Radar name="Performance" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
