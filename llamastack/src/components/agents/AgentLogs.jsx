import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AgentLogs = () => {
  const agents = [
    { id: 1, name: 'Agent 1' },
    { id: 2, name: 'Agent 2' },
  ];

  return (
    <div className="space-y-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select agent" />
        </SelectTrigger>
        <SelectContent>
          {agents.map((agent) => (
            <SelectItem key={agent.id} value={agent.id.toString()}>{agent.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea 
        className="mt-4" 
        rows={10} 
        readOnly 
        value="[2023-05-01 10:00:15] Agent started
[2023-05-01 10:01:30] Processed request #1234
[2023-05-01 10:02:45] Error: Unable to connect to external API
[2023-05-01 10:03:10] Retrying connection...
[2023-05-01 10:03:25] Connection established" 
      />
    </div>
  );
};

export default AgentLogs;