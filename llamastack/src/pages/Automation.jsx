import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowDesigner from '@/components/automation/WorkflowDesigner';
import TriggerTypes from '@/components/automation/TriggerTypes';
import ActionNodes from '@/components/automation/ActionNodes';
import DataFlowConnectors from '@/components/automation/DataFlowConnectors';
import WorkflowTemplates from '@/components/automation/WorkflowTemplates';
import ExecutionLogs from '@/components/automation/ExecutionLogs';
import ErrorHandling from '@/components/automation/ErrorHandling';

const Automation = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Automation Workflows</h1>
      <Tabs defaultValue="designer">
        <TabsList className="mb-4">
          <TabsTrigger value="designer">Workflow Designer</TabsTrigger>
          <TabsTrigger value="triggers">Trigger Types</TabsTrigger>
          <TabsTrigger value="actions">Action Nodes</TabsTrigger>
          <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="logs">Execution Logs</TabsTrigger>
          <TabsTrigger value="errors">Error Handling</TabsTrigger>
        </TabsList>
        <TabsContent value="designer">
          <WorkflowDesigner />
        </TabsContent>
        <TabsContent value="triggers">
          <TriggerTypes />
        </TabsContent>
        <TabsContent value="actions">
          <ActionNodes />
        </TabsContent>
        <TabsContent value="dataflow">
          <DataFlowConnectors />
        </TabsContent>
        <TabsContent value="templates">
          <WorkflowTemplates />
        </TabsContent>
        <TabsContent value="logs">
          <ExecutionLogs />
        </TabsContent>
        <TabsContent value="errors">
          <ErrorHandling />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Automation;