"use client"; // Added "use client" as Recharts components are interactive

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, 
  CartesianGrid, Legend, BarChart, Bar, AreaChart, Area, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, ComposedChart 
} from "recharts";
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";

// --- Change: Centralized color definitions for easier maintenance ---
const commodityColors = {
  mustard: "hsl(var(--primary))",
  soybean: "hsl(var(--chart-neutral))",
  groundnut: "hsl(var(--chart-gain))",
  sunflower: "hsl(var(--accent))",
  high: "hsl(var(--chart-gain))",
  low: "hsl(var(--destructive))",
  avg: "hsl(var(--primary))",
  transactions: "hsl(var(--primary))",
  volume: "hsl(var(--chart-gain))",
  volatility: "hsl(var(--destructive))",
  performance: "hsl(var(--primary))"
};

// --- Data (Original) ---
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

// --- Spot prices (with more random, spiky variations) ---
const spotData = [
  { date: "Jan 1", mustard: 5500, soybean: 4200, groundnut: 6000, sunflower: 6900 },
  { date: "Jan 2", mustard: 5560, soybean: 4190, groundnut: 6080, sunflower: 6920 },
  { date: "Jan 3", mustard: 5520, soybean: 4210, groundnut: 6030, sunflower: 6960 },
  { date: "Jan 4", mustard: 5630, soybean: 4180, groundnut: 6120, sunflower: 7000 },
  { date: "Jan 5", mustard: 5690, soybean: 4155, groundnut: 6060, sunflower: 6940 },
  { date: "Jan 6", mustard: 5740, soybean: 4130, groundnut: 6130, sunflower: 7020 },
  { date: "Jan 7", mustard: 5660, soybean: 4170, groundnut: 6100, sunflower: 6980 },
  { date: "Jan 8", mustard: 5790, soybean: 4120, groundnut: 6190, sunflower: 7070 },
  { date: "Jan 9", mustard: 5850, soybean: 4090, groundnut: 6250, sunflower: 7050 },
  { date: "Jan 10", mustard: 5780, soybean: 4140, groundnut: 6160, sunflower: 7090 },
  { date: "Jan 11", mustard: 5920, soybean: 4110, groundnut: 6300, sunflower: 7130 },
  { date: "Jan 12", mustard: 5960, soybean: 4090, groundnut: 6280, sunflower: 7100 },
  { date: "Jan 13", mustard: 5890, soybean: 4100, groundnut: 6330, sunflower: 7160 },
  { date: "Jan 14", mustard: 6030, soybean: 4060, groundnut: 6370, sunflower: 7190 },
  { date: "Jan 15", mustard: 6080, soybean: 4040, groundnut: 6420, sunflower: 7220 },
  { date: "Jan 16", mustard: 6000, soybean: 4065, groundnut: 6340, sunflower: 7170 },
  { date: "Jan 17", mustard: 6120, soybean: 4010, groundnut: 6460, sunflower: 7240 },
  { date: "Jan 18", mustard: 6180, soybean: 3985, groundnut: 6520, sunflower: 7300 },
  { date: "Jan 19", mustard: 6100, soybean: 4020, groundnut: 6440, sunflower: 7280 },
  { date: "Jan 20", mustard: 6220, soybean: 3970, groundnut: 6550, sunflower: 7350 },
  { date: "Jan 21", mustard: 6280, soybean: 3945, groundnut: 6610, sunflower: 7420 },
  { date: "Jan 22", mustard: 6200, soybean: 3980, groundnut: 6530, sunflower: 7390 },
  { date: "Jan 23", mustard: 6330, soybean: 3930, groundnut: 6660, sunflower: 7460 },
  { date: "Jan 24", mustard: 6400, soybean: 3890, groundnut: 6720, sunflower: 7510 },
  { date: "Jan 25", mustard: 6520, soybean: 3870, groundnut: 6770, sunflower: 7530 },
];


// --- Futures prices (stronger spikes, trend more visible) ---



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

// --- Change: Added fill colors directly from our color object ---
const marketShareData = [
  { name: "Soybean", value: 42, fill: commodityColors.soybean },
  { name: "Mustard", value: 28, fill: commodityColors.mustard },
  { name: "Groundnut", value: 18, fill: commodityColors.groundnut },
  { name: "Sunflower", value: 12, fill: commodityColors.sunflower },
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
  { date: "Feb 1", mustard: 6400, soybean: 3920, groundnut: 6600, sunflower: 7350 },
  { date: "Feb 2", mustard: 6480, soybean: 3895, groundnut: 6690, sunflower: 7390 },
  { date: "Feb 3", mustard: 6430, soybean: 3950, groundnut: 6620, sunflower: 7340 },
  { date: "Feb 4", mustard: 6530, soybean: 3880, groundnut: 6720, sunflower: 7420 },
  { date: "Feb 5", mustard: 6580, soybean: 3860, groundnut: 6760, sunflower: 7450 },
  { date: "Feb 6", mustard: 6500, soybean: 3880, groundnut: 6690, sunflower: 7420 },
  { date: "Feb 7", mustard: 6630, soybean: 3850, groundnut: 6820, sunflower: 7480 },
  { date: "Feb 8", mustard: 6700, soybean: 3830, groundnut: 6900, sunflower: 7530 },
  { date: "Feb 9", mustard: 6650, soybean: 3845, groundnut: 6850, sunflower: 7510 },
  { date: "Feb 10", mustard: 6750, soybean: 3810, groundnut: 6930, sunflower: 7560 },
  { date: "Feb 11", mustard: 6820, soybean: 3790, groundnut: 6980, sunflower: 7600 },
  { date: "Feb 12", mustard: 6760, soybean: 3820, groundnut: 6920, sunflower: 7570 },
  { date: "Feb 13", mustard: 6890, soybean: 3770, groundnut: 7050, sunflower: 7650 },
  { date: "Feb 14", mustard: 6970, soybean: 3750, groundnut: 7100, sunflower: 7700 },
  { date: "Feb 15", mustard: 6920, soybean: 3760, groundnut: 7040, sunflower: 7670 },
  { date: "Feb 16", mustard: 7050, soybean: 3730, groundnut: 7160, sunflower: 7730 },
  { date: "Feb 17", mustard: 7130, soybean: 3700, groundnut: 7230, sunflower: 7790 },
  { date: "Feb 18", mustard: 7070, soybean: 3720, groundnut: 7180, sunflower: 7760 },
  { date: "Feb 19", mustard: 7190, soybean: 3680, groundnut: 7290, sunflower: 7810 },
  { date: "Feb 20", mustard: 7250, soybean: 3660, groundnut: 7350, sunflower: 7870 },
  { date: "Feb 21", mustard: 7180, soybean: 3680, groundnut: 7280, sunflower: 7830 },
  { date: "Feb 22", mustard: 7300, soybean: 3640, groundnut: 7400, sunflower: 7910 },
  { date: "Feb 23", mustard: 7400, soybean: 3620, groundnut: 7500, sunflower: 7960 },
  { date: "Feb 24", mustard: 7350, soybean: 3650, groundnut: 7450, sunflower: 7940 },
  { date: "Feb 25", mustard: 7450, soybean: 3600, groundnut: 7550, sunflower: 8010 },
];

// --- Change: Added a new Custom Tooltip component ---
// This component will be reused by all charts for a consistent look
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-card p-2 shadow-sm text-card-foreground">
        <p className="font-bold text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="text-xs flex justify-between gap-4" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span className="font-medium">
              {entry.value.toLocaleString('en-IN')}
              {/* Suffix for specific tooltips, e.g., '%' or 'quintals' */}
              {entry.dataKey === 'volatility' || entry.name.includes('%') ? '%' : ''}
              {entry.dataKey.includes('volume') && !label ? ' quintals' : ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- Change: Added custom label for the Donut Chart ---
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7; // Position label inside slice
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white" // Assuming dark slices, change if needed
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


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
                        {/* --- Change: Added YAxis with domain to fix flat mini-charts --- */}
                        <YAxis hide domain={['dataMin', 'dataMax']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name={commodity.name} // --- Change: Added name for tooltip
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
            {/* --- Change: Improved mobile responsiveness for tabs --- */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto">
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
                  {/* --- Change: Added domain to YAxis to fix flat lines --- */}
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                  />
                  {/* --- Change: Using new CustomTooltip --- */}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {/* --- Change: Using colors from centralized object --- */}
                  <Line type="monotone" dataKey="mustard" stroke={commodityColors.mustard} strokeWidth={2} name="Mustard" />
                  <Line type="monotone" dataKey="soybean" stroke={commodityColors.soybean} strokeWidth={2} name="Soybean" />
                  <Line type="monotone" dataKey="groundnut" stroke={commodityColors.groundnut} strokeWidth={2} name="Groundnut" />
                  <Line type="monotone" dataKey="sunflower" stroke={commodityColors.sunflower} strokeWidth={2} name="Sunflower" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="futures" className="h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={futuresData}>
                  <defs>
                    <linearGradient id="colorMustard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={commodityColors.mustard} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={commodityColors.mustard} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSoybean" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={commodityColors.soybean} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={commodityColors.soybean} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGroundnut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={commodityColors.groundnut} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={commodityColors.groundnut} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  {/* --- Change: Added domain to YAxis to fix flat lines --- */}
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                  />
                  {/* --- Change: Using new CustomTooltip --- */}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="mustard" stroke={commodityColors.mustard} fillOpacity={1} fill="url(#colorMustard)" name="Mustard" />
                  <Area type="monotone" dataKey="soybean" stroke={commodityColors.soybean} fillOpacity={1} fill="url(#colorSoybean)" name="Soybean" />
                  {/* --- Change: Added gradient and Area for Groundnut --- */}
                  <Area type="monotone" dataKey="groundnut" stroke={commodityColors.groundnut} fillOpacity={1} fill="url(#colorGroundnut)" name="Groundnut" />
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
              {/* --- Change: Using new CustomTooltip --- */}
              <Tooltip 
                content={<CustomTooltip />}
                formatter={(value: number) => `${value.toLocaleString('en-IN')} quintals`}
              />
              <Legend />
              {/* --- Change: Using colors from centralized object --- */}
              <Bar dataKey="mustard" fill={commodityColors.mustard} name="Mustard" radius={[4, 4, 0, 0]} />
              <Bar dataKey="soybean" fill={commodityColors.soybean} name="Soybean" radius={[4, 4, 0, 0]} />
              <Bar dataKey="groundnut" fill={commodityColors.groundnut} name="Groundnut" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sunflower" fill={commodityColors.sunflower} name="Sunflower" radius={[4, 4, 0, 0]} />
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
                {/* --- Change: Using new CustomTooltip --- */}
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // --- Change: Using custom label and converted to Donut ---
                  label={renderCustomizedLabel}
                  innerRadius={60} // This makes it a donut chart
                  outerRadius={100} // Adjusted outer radius
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {/* --- Change: Cell fill is now handled by the data object --- */}
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                  ))}
                </Pie>
                <Legend />
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
                {/* --- Change: Using new CustomTooltip --- */}
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="volatility" name="Volatility" fill={commodityColors.volatility} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Price Spread Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> {/* Replaced icon */}
            Weekly Price Spread Analysis
          </CardTitle>
          <CardDescription>High, Low, and Average prices across all commodities</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={priceSpreadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
              {/* --- Change: Using new CustomTooltip --- */}
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {/* --- Change: Using colors from centralized object --- */}
              <Bar dataKey="high" fill={commodityColors.high} name="High Price" radius={[4, 4, 0, 0]} />
              <Bar dataKey="low" fill={commodityColors.low} name="Low Price" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="avg" stroke={commodityColors.avg} strokeWidth={3} name="Average" />
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
                {/* --- Change: Using new CustomTooltip --- */}
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {/* --- Change: Using colors from centralized object --- */}
                <Bar yAxisId="left" dataKey="transactions" fill={commodityColors.transactions} name="Transactions" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="volume" stroke={commodityColors.volume} strokeWidth={2} name="Volume" />
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
                {/* --- Change: Using new CustomTooltip --- */}
                <Tooltip content={<CustomTooltip />} />
                <Radar name="Performance" dataKey="value" stroke={commodityColors.performance} fill={commodityColors.performance} fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}