import { HomeIcon, BookOpenIcon, CodeIcon, ClockIcon, DatabaseIcon, WorkflowIcon, BarChart2Icon, ShieldIcon, PlugIcon, CpuIcon, SettingsIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import LlamaStackApps from "./pages/docs/LlamaStackApps.jsx";
import Agents from "./pages/Agents.jsx";
import Cron from "./pages/Cron.jsx";
import Data from "./pages/Data.jsx";
import Automation from "./pages/Automation.jsx";
import Analytics from "./pages/Analytics.jsx";
import Security from "./pages/Security.jsx";
import Integration from "./pages/Integration.jsx";
import Resources from "./pages/Resources.jsx";
import Settings from "./pages/Settings.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Llama Stack Apps",
    to: "/docs/llama-stack-apps",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <LlamaStackApps />,
  },
  {
    title: "Agents",
    to: "/agents",
    icon: <CodeIcon className="h-4 w-4" />,
    page: <Agents />,
  },
  {
    title: "Cron",
    to: "/cron",
    icon: <ClockIcon className="h-4 w-4" />,
    page: <Cron />,
  },
  {
    title: "Data",
    to: "/data",
    icon: <DatabaseIcon className="h-4 w-4" />,
    page: <Data />,
  },
  {
    title: "Automation",
    to: "/automation",
    icon: <WorkflowIcon className="h-4 w-4" />,
    page: <Automation />,
  },
  {
    title: "Analytics",
    to: "/analytics",
    icon: <BarChart2Icon className="h-4 w-4" />,
    page: <Analytics />,
  },
  {
    title: "Security",
    to: "/security",
    icon: <ShieldIcon className="h-4 w-4" />,
    page: <Security />,
  },
  {
    title: "Integration",
    to: "/integration",
    icon: <PlugIcon className="h-4 w-4" />,
    page: <Integration />,
  },
  {
    title: "Resources",
    to: "/resources",
    icon: <CpuIcon className="h-4 w-4" />,
    page: <Resources />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <Settings />,
  },
];