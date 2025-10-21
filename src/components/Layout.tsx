import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Activity, FileText, GraduationCap, History, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Forecasting", href: "/forecasting", icon: TrendingUp },
  { name: "Hedging Simulator", href: "/simulator", icon: Activity },
  { name: "e-Contracts", href: "/contracts", icon: FileText },
  { name: "Education", href: "/education", icon: GraduationCap },
  { name: "History", href: "/history", icon: History },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">HedgeAI</h1>
                  <p className="text-xs text-muted-foreground">HedgeSeed</p>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link key={item.name} to={item.href}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className="gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden lg:inline">{item.name}</span>
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center bg-accent">
                2
              </Badge>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur">
        <div className="grid grid-cols-6 gap-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="w-full flex-col h-auto py-2 gap-1"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px]">{item.name.split(" ")[0]}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
