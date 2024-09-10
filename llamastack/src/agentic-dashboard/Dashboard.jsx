import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { encryptAndStoreApiEndpoint, checkForStoredApiEndpoint, getStoredApiEndpoint } from '../utils/apiKeyStorage';
import WelcomeMessage from './components/WelcomeMessage';
import ActionCard from './components/ActionCard';
import ApiEndpointInput from './components/ApiEndpointInput';
import createLlamaStackApi from '../services/llamaStackApi';

const Dashboard = () => {
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const [llamaStackApi, setLlamaStackApi] = useState(null);

  useEffect(() => {
    const initializeApi = async () => {
      const storedEndpoint = await getStoredApiEndpoint();
      if (storedEndpoint) {
        setApiEndpoint(storedEndpoint);
        const api = await createLlamaStackApi();
        setLlamaStackApi(api);
      } else {
        setShowApiInput(true);
      }
    };
    initializeApi();
  }, []);

  const handleApiEndpointSubmit = async () => {
    if (apiEndpoint) {
      await encryptAndStoreApiEndpoint(apiEndpoint, apiKey);
      setShowApiInput(false);
      const api = await createLlamaStackApi();
      setLlamaStackApi(api);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-blue-900 text-gray-900 dark:text-white max-w-full overflow-x-hidden">
      <header className="bg-white/10 shadow-md w-full mb-4 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">LlamaStack Dashboard</h1>
          <Avatar>
            <AvatarImage src={profile?.avatar_url} alt={profile?.first_name} />
            <AvatarFallback>{profile?.first_name?.[0]}{profile?.last_name?.[0]}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-grow overflow-auto p-4 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <WelcomeMessage />

          {showApiInput && (
            <ApiEndpointInput
              apiEndpoint={apiEndpoint}
              apiKey={apiKey}
              setApiEndpoint={setApiEndpoint}
              setApiKey={setApiKey}
              handleApiEndpointSubmit={handleApiEndpointSubmit}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard
              title="Create New Agent"
              description="Start building a new LlamaStack Agent"
              icon="Code"
              link="/automation"
            />
            <ActionCard
              title="Manage Sessions"
              description="View and manage your agent sessions"
              icon="Clock"
              link="/worker"
            />
            <ActionCard
              title="View Analytics"
              description="Monitor your agents' performance"
              icon="BarChart2"
              link="/analytics"
            />
          </div>

          <Card className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Follow these steps to get up and running with LlamaStack</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create your first agent in the Agents tab</li>
                <li>Set up a session to interact with your agent</li>
                <li>Use the API to integrate LlamaStack into your applications</li>
                <li>Monitor performance in the Analytics section</li>
                <li>Explore advanced features like memory banks and custom tools</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;