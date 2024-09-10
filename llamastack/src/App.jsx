import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SupabaseAuthProvider, useSupabaseAuth } from '@/integrations/supabase'
import { ThemeProvider } from 'next-themes'
import Layout from './components/Layout'
import Index from './pages/Index'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Subscription from './pages/Subscription'
import FAQ from './pages/FAQ'
import Settings from './pages/Settings'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Chat from './pages/Chat'
import Agents from './pages/Agents'
import Cron from './pages/Cron'
import Data from './pages/Data'
import Automation from './pages/Automation'
import Analytics from './pages/Analytics'
import Security from './pages/Security'
import Integration from './pages/Integration'
import Resources from './pages/Resources'
import Readme from './pages/docs/Readme'
import DevelopmentGuidelines from './pages/docs/DevelopmentGuidelines'
import SecurityDoc from './pages/docs/Security'
import Deployment from './pages/docs/Deployment'
import Database from './pages/docs/Database'
import Modules from './pages/docs/Modules'
import Prompts from './pages/docs/Prompts'
import AIPoweredFeatures from './pages/docs/AIPoweredFeatures'
import API from './pages/docs/API'
import Environment from './pages/docs/Environment'
import Testing from './pages/docs/Testing'
import Performance from './pages/docs/Performance'
import Changelog from './pages/docs/Changelog'
import LlamaStackApps from './pages/docs/LlamaStackApps'

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }) => {
  const auth = useSupabaseAuth();
  if (auth === undefined) {
    return null; // or a loading spinner
  }
  const { session } = auth;
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <SupabaseAuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/cron" element={<Cron />} />
                <Route path="/data" element={<Data />} />
                <Route path="/automation" element={<Automation />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/security" element={<Security />} />
                <Route path="/integration" element={<Integration />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/docs/readme" element={<Readme />} />
                <Route path="/docs/development-guidelines" element={<DevelopmentGuidelines />} />
                <Route path="/docs/security" element={<SecurityDoc />} />
                <Route path="/docs/deployment" element={<Deployment />} />
                <Route path="/docs/database" element={<Database />} />
                <Route path="/docs/modules" element={<Modules />} />
                <Route path="/docs/prompts" element={<Prompts />} />
                <Route path="/docs/ai-powered-features" element={<AIPoweredFeatures />} />
                <Route path="/docs/api" element={<API />} />
                <Route path="/docs/environment" element={<Environment />} />
                <Route path="/docs/testing" element={<Testing />} />
                <Route path="/docs/performance" element={<Performance />} />
                <Route path="/docs/changelog" element={<Changelog />} />
                <Route path="/docs/llama-stack-apps" element={<LlamaStackApps />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </SupabaseAuthProvider>
    </Router>
  </QueryClientProvider>
)

export default App