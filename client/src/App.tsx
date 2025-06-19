import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import Brazing from "@/pages/brazing";
import ElectricalContact from "@/pages/electrical-contact";
import SilverFiller from "@/pages/silver-filler";
import SilverPrice from "@/pages/silver-price";
import Inventory from "@/pages/inventory";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/brazing" component={Brazing} />
      <Route path="/electrical-contact" component={ElectricalContact} />
      <Route path="/silver-filler" component={SilverFiller} />
      <Route path="/silver-price" component={SilverPrice} />
      <Route path="/inventory" component={Inventory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
