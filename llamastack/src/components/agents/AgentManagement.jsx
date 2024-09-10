import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AgentManagement = () => {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Agent 1', status: 'Active', type: 'Chatbot' },
    { id: 2, name: 'Agent 2', status: 'Inactive', type: 'Task Automation' },
  ]);

  const handleEditAgent = (id) => {
    console.log(`Editing agent ${id}`);
  };

  const handleDeployAgent = (id) => {
    console.log(`Deploying agent ${id}`);
  };

  const handleRemoveAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell>{agent.name}</TableCell>
            <TableCell>{agent.type}</TableCell>
            <TableCell>{agent.status}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditAgent(agent.id)}>Edit</Button>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => handleDeployAgent(agent.id)}>Deploy</Button>
              <Button variant="outline" size="sm" onClick={() => handleRemoveAgent(agent.id)}>Remove</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AgentManagement;