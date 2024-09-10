import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { Home, Search, Settings, Sun, Moon, Menu, X, MessageCircle, Code, Clock, Database, Workflow, BarChart2, Shield, Plug, Cpu, Book } from 'lucide-react';
import { useTheme } from 'next-themes';
import Footer from './Footer';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Layout = () => {
  const { logout, session } = useSupabaseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/profile' },
    { icon: <Code className="w-5 h-5" />, label: 'Agents', path: '/agents' },
    { icon: <Clock className="w-5 h-5" />, label: 'Cron', path: '/cron' },
    { icon: <Database className="w-5 h-5" />, label: 'Data', path: '/data' },
    { icon: <Workflow className="w-5 h-5" />, label: 'Automation', path: '/automation' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics', path: '/analytics' },
    { icon: <Shield className="w-5 h-5" />, label: 'Security', path: '/security' },
    { icon: <Plug className="w-5 h-5" />, label: 'Integration', path: '/integration' },
    { icon: <Cpu className="w-5 h-5" />, label: 'Resources', path: '/resources' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  const docItems = [
    { label: 'README', path: '/docs/readme' },
    { label: 'Development Guidelines', path: '/docs/development-guidelines' },
    { label: 'Security Best Practices', path: '/docs/security' },
    { label: 'Deployment Guide', path: '/docs/deployment' },
    { label: 'Database Setup & Usage', path: '/docs/database' },
    { label: 'Modules and Dependencies', path: '/docs/modules' },
    { label: 'Prompt Engineering', path: '/docs/prompts' },
    { label: 'AI-Powered Features', path: '/docs/ai-powered-features' },
    { label: 'API Integration', path: '/docs/api' },
    { label: 'Environment Setup', path: '/docs/environment' },
    { label: 'Testing Guide', path: '/docs/testing' },
    { label: 'Performance Optimization', path: '/docs/performance' },
    { label: 'Changelog', path: '/docs/changelog' },
    { label: 'Llama Stack Apps', path: '/docs/llama-stack-apps' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!mounted) {
    return null;
  }

  const renderNavItems = (items, mobile = false) => (
    <>
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center p-2 rounded-lg mb-1 ${
            location.pathname === item.path
              ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
        >
          {item.icon}
          <span className="ml-3">{item.label}</span>
        </Link>
      ))}
    </>
  );

  const renderDocItems = (mobile = false) => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="docs">
        <AccordionTrigger className="flex items-center p-2 rounded-lg mb-1">
          <Book className="w-5 h-5 mr-3" />
          Documentation
        </AccordionTrigger>
        <AccordionContent>
          {docItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center p-2 pl-6 rounded-lg mb-1 ${
                location.pathname === item.path
                  ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => mobile && setIsMobileMenuOpen(false)}
            >
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  const renderBottomNavItems = () => (
    <div className="flex space-x-2 mb-2">
      <Link to="/search" className="flex-1">
        <Button variant="outline" className="w-full">
          <Search className="h-5 w-5" />
        </Button>
      </Link>
      <Link to="/chat" className="flex-1">
        <Button variant="outline" className="w-full">
          <MessageCircle className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/profile" className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            🦙 LlamaStack
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          {renderNavItems(navItems)}
          {renderDocItems()}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {renderBottomNavItems()}
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Log out
          </Button>
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    🦙 LlamaStack
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                {renderNavItems(navItems, true)}
                {renderDocItems(true)}
                <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
                  {renderBottomNavItems()}
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    Log out
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/profile" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            🦙 LlamaStack
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;