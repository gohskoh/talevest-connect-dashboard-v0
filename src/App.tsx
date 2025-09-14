import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SolanaWalletProvider } from './lib/solana-wallet-provider'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingScreen from './components/LoadingScreen'
import Landing from "./pages/Landing";
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

const AppRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/landing" element={!user ? <Landing /> : <Navigate to="/" replace />} />
      <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" replace />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/fyts" element={
        <ProtectedRoute>
          <FYTS />
        </ProtectedRoute>
      } />
      <Route path="/floor" element={
        <ProtectedRoute>
          <Floor />
        </ProtectedRoute>
      } />
      <Route path="/token" element={
        <ProtectedRoute>
          <Token />
        </ProtectedRoute>
      } />
      <Route path="/contracts" element={
        <ProtectedRoute>
          <Contracts />
        </ProtectedRoute>
      } />
      <Route path="/vote" element={
        <ProtectedRoute>
          <Vote />
        </ProtectedRoute>
      } />
      <Route path="/talent-application" element={
        <ProtectedRoute>
          <TalentApplication />
        </ProtectedRoute>
      } />
      <Route path="/airdrop" element={
        <ProtectedRoute>
          <Airdrop />
        </ProtectedRoute>
      } />
      
      {/* Default redirect */}
      <Route path="*" element={!user ? <Navigate to="/landing" replace /> : <NotFound />} />
    </Routes>
  )
}

const App = () => (
  <AuthProvider>
    <SolanaWalletProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SolanaWalletProvider>
  </AuthProvider>
);

export default App;
