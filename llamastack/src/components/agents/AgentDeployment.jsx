import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AgentDeployment = () => {
  const agents = [
    { id: 1, name: 'Agent 1', version: 'v1.0.0', lastDeployed: '2023-05-01' },
    { id: 2, name: 'Agent 2', version: 'v1.1.0', lastDeployed: '2023-05-15' },
  ];

  const handleDeployAgent = (id) => {
    console.log(`Deploying agent ${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent Name</TableHead>
          <TableHead>Current Version</TableHead>
          <TableHead>Last Deployed</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell>{agent.name}</TableCell>
            <TableCell>{agent.version}</TableCell>
            <TableCell>{agent.lastDeployed}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => handleDeployAgent(agent.id)}>Deploy</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AgentDeployment;