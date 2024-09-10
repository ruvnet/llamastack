import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentManagement from '@/components/agents/AgentManagement';
import AgentCreation from '@/components/agents/AgentCreation';
import AgentDeployment from '@/components/agents/AgentDeployment';
import AgentMonitoring from '@/components/agents/AgentMonitoring';
import AgentLogs from '@/components/agents/AgentLogs';
import AgentWizard from '@/components/agents/AgentWizard';
import { useSupabaseAuth } from '@/integrations/supabase';
import { supabase } from '@/lib/supabase';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const { session } = useSupabaseAuth();

  useEffect(() => {
    if (session) {
      fetchAgents();
    }
  }, [session]);

  const fetchAgents = async () => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error fetching agents:', error);
    } else {
      setAgents(data);
    }
  };

  const handleAgentCreated = (newAgent) => {
    setAgents([...agents, newAgent]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agentic Engineering</h1>
      <Tabs defaultValue="wizard" className="text-left">
        <TabsList className="mb-4">
          <TabsTrigger value="wizard">Step-by-Step Wizard</TabsTrigger>
          <TabsTrigger value="management">Agent Management</TabsTrigger>
          <TabsTrigger value="creation">Agent Creation</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="wizard">
          <AgentWizard onAgentCreated={handleAgentCreated} />
        </TabsContent>

        <TabsContent value="management">
          <AgentManagement agents={agents} onAgentUpdated={fetchAgents} />
        </TabsContent>

        <TabsContent value="creation">
          <AgentCreation onAgentCreated={handleAgentCreated} />
        </TabsContent>

        <TabsContent value="deployment">
          <AgentDeployment agents={agents} />
        </TabsContent>

        <TabsContent value="monitoring">
          <AgentMonitoring agents={agents} />
        </TabsContent>

        <TabsContent value="logs">
          <AgentLogs agents={agents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agents;