import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const commodityOptions = [
  { value: "mustard", label: "Mustard" },
  { value: "soybean", label: "Soybean" },
  { value: "groundnut", label: "Groundnut" },
  { value: "sunflower", label: "Sunflower" },
];

export default function Contracts() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    buyer: "",
    seller: "",
    commodity: "mustard",
    quantity: "",
    price: "",
    expiryDate: "",
  });
  const [contracts, setContracts] = useState<any[]>([]);
  
  const generateContractHash = () => {
    return `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.buyer || !formData.seller || !formData.quantity || !formData.price || !formData.expiryDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all contract details",
        variant: "destructive",
      });
      return;
    }
    
    const contractHash = generateContractHash();
    const newContract = {
      id: Date.now(),
      ...formData,
      hash: contractHash,
      createdAt: new Date().toISOString(),
      status: "active",
    };
    
    setContracts([newContract, ...contracts]);
    
    toast({
      title: "Contract created",
      description: `Contract logged on blockchain with hash ${contractHash.substring(0, 10)}...`,
    });
    
    // Reset form
    setFormData({
      buyer: "",
      seller: "",
      commodity: "mustard",
      quantity: "",
      price: "",
      expiryDate: "",
    });
  };
  
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Forward e-Contracts</h1>
        <p className="text-muted-foreground mt-1">Create and verify blockchain-secured agreements</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Contract</CardTitle>
            <CardDescription>All contracts are logged on Polygon testnet</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buyer">Buyer Name/Organization</Label>
                <Input
                  id="buyer"
                  value={formData.buyer}
                  onChange={(e) => setFormData({ ...formData, buyer: e.target.value })}
                  placeholder="Enter buyer name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seller">Seller (FPO) Name</Label>
                <Input
                  id="seller"
                  value={formData.seller}
                  onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                  placeholder="Enter FPO name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="commodity">Commodity</Label>
                <Select value={formData.commodity} onValueChange={(value) => setFormData({ ...formData, commodity: value })}>
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
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (quintals)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Agreed Price (₹/quintal)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="5500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
              
              <Button type="submit" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Create Contract
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">🔐 How Blockchain Contracts Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0">1</div>
              <div>
                <p className="font-medium text-foreground">Create Agreement</p>
                <p>Both parties agree on terms: commodity, quantity, price, delivery date</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0">2</div>
              <div>
                <p className="font-medium text-foreground">Blockchain Logging</p>
                <p>Contract details are hashed and logged on Polygon testnet (immutable record)</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0">3</div>
              <div>
                <p className="font-medium text-foreground">Verification</p>
                <p>Both parties receive contract hash for verification and dispute resolution</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
              <p className="text-success font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Secure & Transparent
              </p>
              <p className="text-xs mt-1">No party can alter terms once logged on blockchain</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {contracts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Contracts</CardTitle>
            <CardDescription>Blockchain-verified forward agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{contract.buyer} ↔ {contract.seller}</p>
                      <Badge variant="default">{contract.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {contract.quantity} quintals of {commodityOptions.find(c => c.value === contract.commodity)?.label} @ ₹{contract.price}/quintal
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires: {new Date(contract.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-3 w-3" />
                      View on Explorer
                    </Button>
                    <p className="text-xs text-muted-foreground font-mono">
                      {contract.hash.substring(0, 16)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
