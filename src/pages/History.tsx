import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Activity, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";

const simulationHistory = [
  {
    id: 1,
    date: "2025-02-01",
    commodity: "Mustard",
    quantity: 100,
    lockedPrice: 5600,
    actualPrice: 5820,
    hedged: true,
    profit: 2000,
    decision: "Hedged at ₹5,600",
  },
  {
    id: 2,
    date: "2025-01-28",
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
    date: "2025-01-25",
    commodity: "Groundnut",
    quantity: 80,
    lockedPrice: 6100,
    actualPrice: 6120,
    hedged: true,
    profit: 1600,
    decision: "Hedged at ₹6,100",
  },
];

const contractHistory = [
  {
    id: 1,
    date: "2025-02-01",
    buyer: "AgriCorp Ltd",
    seller: "Green Valley FPO",
    commodity: "Mustard",
    quantity: 200,
    price: 5650,
    hash: "0xabc123def456",
    status: "active",
  },
  {
    id: 2,
    date: "2025-01-29",
    buyer: "FoodTech Industries",
    seller: "Sunrise FPO",
    commodity: "Soybean",
    quantity: 300,
    price: 4280,
    hash: "0xdef789ghi012",
    status: "completed",
  },
];

export default function History() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Transaction History</h1>
        <p className="text-muted-foreground mt-1">Review past simulations and contracts</p>
      </div>
      
      <Tabs defaultValue="simulations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simulations" className="gap-2">
            <Activity className="h-4 w-4" />
            Simulations
          </TabsTrigger>
          <TabsTrigger value="contracts" className="gap-2">
            <FileText className="h-4 w-4" />
            Contracts
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
            simulationHistory.map((sim) => {
              const profitPercentage = ((sim.profit / (sim.quantity * sim.lockedPrice)) * 100).toFixed(1);
              const isProfit = sim.profit > 0;
              
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
                  <CardContent>
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
                            {isProfit ? '+' : '-'}₹{Math.abs(sim.profit).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">({profitPercentage}%)</p>
                      </div>
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
          {contractHistory.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No contracts yet</p>
                <p className="text-sm text-muted-foreground mt-1">Create your first e-contract to see it here</p>
              </CardContent>
            </Card>
          ) : (
            contractHistory.map((contract) => (
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
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Commodity</p>
                      <p className="text-lg font-semibold">{contract.commodity}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="text-lg font-semibold">{contract.quantity} quintals</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Agreed Price</p>
                      <p className="text-lg font-semibold">₹{contract.price.toLocaleString('en-IN')}/quintal</p>
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
      </Tabs>
    </div>
  );
}
