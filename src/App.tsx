import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SolanaWalletProvider } from './lib/solana-wallet-provider'
import Index from "./pages/Index";
import FYTS from "./pages/FYTS";
import Floor from "./pages/Floor";
import Token from "./pages/Token";
import Vote from "./pages/Vote";
import Contracts from "./pages/Contracts";
import Auth from "./pages/Auth";
import TalentApplication from "./pages/TalentApplication";
import Airdrop from "./pages/Airdrop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <SolanaWalletProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/fyts" element={<FYTS />} />
            <Route path="/floor" element={<Floor />} />
            <Route path="/token" element={<Token />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/talent-application" element={<TalentApplication />} />
            <Route path="/airdrop" element={<Airdrop />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </SolanaWalletProvider>
);

export default App;
