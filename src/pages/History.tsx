import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Activity, TrendingUp, TrendingDown, ExternalLink, PieChart, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

const simulationHistory = [
  {
    id: 1,
    date: "2025-02-15",
    commodity: "Mustard",
    quantity: 100,
    lockedPrice: 5600,
    actualPrice: 5820,
    hedged: true,
    profit: 22000,
    decision: "Hedged at ₹5,600",
  },
  {
    id: 2,
    date: "2025-02-10",
    commodity: "Soybean",
    quantity: 150,
    lockedPrice: 4250,
    actualPrice: 4280,
    hedged: false,
    profit: 4500,
    decision: "Stayed Unhedged",
  },
  {
    id: 3,
    date: "2025-02-05",
    commodity: "Groundnut",
    quantity: 80,
    lockedPrice: 6100,
    actualPrice: 6120,
    hedged: true,
    profit: 1600,
    decision: "Hedged at ₹6,100",
  },
  {
    id: 4,
    date: "2025-01-28",
    commodity: "Sunflower",
    quantity: 120,
    lockedPrice: 5800,
    actualPrice: 5650,
    hedged: true,
    profit: -18000,
    decision: "Hedged at ₹5,800",
  },
  {
    id: 5,
    date: "2025-01-20",
    commodity: "Mustard",
    quantity: 90,
    lockedPrice: 5550,
    actualPrice: 5720,
    hedged: false,
    profit: 15300,
    decision: "Stayed Unhedged",
  },
  {
    id: 6,
    date: "2025-01-15",
    commodity: "Soybean",
    quantity: 200,
    lockedPrice: 4200,
    actualPrice: 4180,
    hedged: true,
    profit: -4000,
    decision: "Hedged at ₹4,200",
  },
  {
    id: 7,
    date: "2025-01-10",
    commodity: "Groundnut",
    quantity: 110,
    lockedPrice: 6050,
    actualPrice: 6200,
    hedged: false,
    profit: 16500,
    decision: "Stayed Unhedged",
  },
  {
    id: 8,
    date: "2025-01-05",
    commodity: "Mustard",
    quantity: 85,
    lockedPrice: 5500,
    actualPrice: 5450,
    hedged: true,
    profit: -4250,
    decision: "Hedged at ₹5,500",
  },
];

const contractHistory = [
  {
    id: 1,
    date: "2025-02-15",
    buyer: "AgriCorp Ltd",
    seller: "Green Valley FPO",
    commodity: "Mustard",
    quantity: 200,
    price: 5650,
    value: 1130000,
    hash: "0xabc123def456",
    status: "active",
  },
  {
    id: 2,
    date: "2025-02-10",
    buyer: "FoodTech Industries",
    seller: "Sunrise FPO",
    commodity: "Soybean",
    quantity: 300,
    price: 4280,
    value: 1284000,
    hash: "0xdef789ghi012",
    status: "completed",
  },
  {
    id: 3,
    date: "2025-02-05",
    buyer: "Global Foods Inc",
    seller: "Farmers United Coop",
    commodity: "Groundnut",
    quantity: 150,
    price: 6120,
    value: 918000,
    hash: "0x789xyz456abc",
    status: "completed",
  },
  {
    id: 4,
    date: "2025-01-28",
    buyer: "Oil Mills Corp",
    seller: "Green Valley FPO",
    commodity: "Sunflower",
    quantity: 250,
    price: 5700,
    value: 1425000,
    hash: "0x456def123ghi",
    status: "active",
  },
  {
    id: 5,
    date: "2025-01-20",
    buyer: "AgriCorp Ltd",
    seller: "Sunrise FPO",
    commodity: "Mustard",
    quantity: 180,
    price: 5600,
    value: 1008000,
    hash: "0xghi789xyz234",
    status: "completed",
  },
];

export default function History() {
  // Calculate analytics data
  const totalProfit = simulationHistory.reduce((sum, sim) => sum + sim.profit, 0);
  const profitableTransactions = simulationHistory.filter(sim => sim.profit > 0).length;
  const winRate = ((profitableTransactions / simulationHistory.length) * 100).toFixed(1);
  
  // Cumulative P&L data
  let cumulative = 0;
  const cumulativePnL = simulationHistory
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(sim => {
      cumulative += sim.profit;
      return {
        date: new Date(sim.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        pnl: cumulative,
        transaction: sim.commodity
      };
    });

  // Win/Loss data for pie chart
  const winLossData = [
    { name: 'Profitable', value: profitableTransactions, fill: 'hsl(var(--chart-gain))' },
    { name: 'Loss', value: simulationHistory.length - profitableTransactions, fill: 'hsl(var(--chart-loss))' }
  ];

  // Individual transaction P&L data
  const transactionPnL = simulationHistory.map(sim => ({
    commodity: sim.commodity.substring(0, 3),
    date: new Date(sim.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    pnl: sim.profit,
    fill: sim.profit > 0 ? 'hsl(var(--chart-gain))' : 'hsl(var(--chart-loss))'
  }));

  // Contract value data
  const contractValues = contractHistory.map(contract => ({
    parties: `${contract.buyer.split(' ')[0]} ↔ ${contract.seller.split(' ')[0]}`,
    value: contract.value,
    commodity: contract.commodity
  }));

  // Monthly aggregated data
  const monthlyData = simulationHistory.reduce((acc, sim) => {
    const month = new Date(sim.date).toLocaleDateString('en-IN', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.profit += sim.profit;
      existing.revenue += sim.quantity * sim.actualPrice;
      existing.transactions += 1;
    } else {
      acc.push({
        month,
        profit: sim.profit,
        revenue: sim.quantity * sim.actualPrice,
        transactions: 1
      });
    }
    return acc;
  }, [] as Array<{ month: string; profit: number; revenue: number; transactions: number }>);

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Transaction History</h1>
        <p className="text-muted-foreground mt-1">Review past simulations and contracts with detailed analytics</p>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total P&L</CardDescription>
            <CardTitle className={`text-3xl ${totalProfit > 0 ? 'text-success' : 'text-destructive'}`}>
              {totalProfit > 0 ? '+' : ''}₹{totalProfit.toLocaleString('en-IN')}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Win Rate</CardDescription>
            <CardTitle className="text-3xl text-success">{winRate}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-3xl text-foreground">{simulationHistory.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs defaultValue="simulations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="simulations" className="gap-2">
            <Activity className="h-4 w-4" />
            Simulations
          </TabsTrigger>
          <TabsTrigger value="contracts" className="gap-2">
            <FileText className="h-4 w-4" />
            Contracts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulations" className="mt-6 space-y-4">
          {simulationHistory.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No simulations yet</p>
                <p className="text-sm text-muted-foreground mt-1">Run your first simulation to see results here</p>
              </CardContent>
            </Card>
          ) : (
            simulationHistory
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((sim) => {
                const profitPercentage = ((sim.profit / (sim.quantity * sim.lockedPrice)) * 100).toFixed(1);
                const isProfit = sim.profit > 0;
                const revenue = sim.quantity * sim.actualPrice;
                const cost = sim.quantity * sim.lockedPrice;
                
                return (
                  <Card key={sim.id}>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <CardTitle className="text-lg">{sim.commodity}</CardTitle>
                          <CardDescription>{new Date(sim.date).toLocaleDateString()}</CardDescription>
                        </div>
                        <Badge variant={sim.hedged ? "default" : "secondary"}>
                          {sim.hedged ? "Hedged" : "Unhedged"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Quantity</p>
                          <p className="text-lg font-semibold">{sim.quantity} quintals</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Decision Price</p>
                          <p className="text-lg font-semibold">₹{sim.lockedPrice.toLocaleString('en-IN')}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Actual Price</p>
                          <p className="text-lg font-semibold">₹{sim.actualPrice.toLocaleString('en-IN')}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Net P&L</p>
                          <div className="flex items-center gap-2">
                            {isProfit ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
                            <p className={`text-lg font-semibold ${isProfit ? 'text-success' : 'text-destructive'}`}>
                              {isProfit ? '+' : ''}₹{sim.profit.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">({profitPercentage}%)</p>
                        </div>
                      </div>

                      {/* P&L Breakdown Chart */}
                      <div className="pt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-3">Transaction Breakdown</p>
                        <ResponsiveContainer width="100%" height={150}>
                          <BarChart data={[
                            { name: 'Revenue', value: revenue, fill: 'hsl(var(--primary))' },
                            { name: 'Cost', value: cost, fill: 'hsl(var(--muted-foreground))' },
                            { name: 'P&L', value: Math.abs(sim.profit), fill: isProfit ? 'hsl(var(--chart-gain))' : 'hsl(var(--chart-loss))' }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                              formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                            />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">
                          <strong>Strategy:</strong> {sim.decision}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
          )}
        </TabsContent>
        
        <TabsContent value="contracts" className="mt-6 space-y-4">
          {/* Contract Value Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Contract Values Overview
              </CardTitle>
              <CardDescription>Total value of contracts by parties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contractValues}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="parties" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Contract Value']}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {contractHistory.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No contracts yet</p>
                <p className="text-sm text-muted-foreground mt-1">Create your first e-contract to see it here</p>
              </CardContent>
            </Card>
          ) : (
            contractHistory
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{contract.buyer} ↔ {contract.seller}</CardTitle>
                        <CardDescription>{new Date(contract.date).toLocaleDateString()}</CardDescription>
                      </div>
                      <Badge variant={contract.status === "active" ? "default" : "secondary"}>
                        {contract.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Commodity</p>
                        <p className="text-lg font-semibold">{contract.commodity}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="text-lg font-semibold">{contract.quantity} quintals</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Price per Quintal</p>
                        <p className="text-lg font-semibold">₹{contract.price.toLocaleString('en-IN')}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Total Value</p>
                        <p className="text-lg font-semibold text-primary">₹{contract.value.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-xs text-muted-foreground">Blockchain Hash</p>
                        <p className="font-mono text-sm">{contract.hash}</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-3 w-3" />
                        Verify
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          {/* Cumulative P&L Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Cumulative P&L Over Time
              </CardTitle>
              <CardDescription>Track your profit/loss accumulation across all transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={cumulativePnL}>
                  <defs>
                    <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Cumulative P&L']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pnl" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPnl)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Win/Loss Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Win/Loss Distribution
                </CardTitle>
                <CardDescription>Proportion of profitable vs loss-making transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RePieChart>
                    <Pie
                      data={winLossData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {winLossData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Individual Transaction P&L */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Transaction P&L Comparison
                </CardTitle>
                <CardDescription>Profit/Loss by individual transaction</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={transactionPnL}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="commodity" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={11}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={11}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'P&L']}
                      labelFormatter={(label, payload) => payload[0]?.payload.date || label}
                    />
                    <Bar dataKey="pnl" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Monthly Performance Summary
              </CardTitle>
              <CardDescription>Aggregated profit and revenue by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                  />
                  <Legend />
                  <Bar dataKey="profit" fill="hsl(var(--chart-gain))" name="Net Profit" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
