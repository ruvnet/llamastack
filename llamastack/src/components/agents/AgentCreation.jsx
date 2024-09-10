import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ConfigurationEditor from './ConfigurationEditor';
import { agentTypes, getConfigExample } from './agentUtils';

const AgentCreation = () => {
  const [newAgent, setNewAgent] = useState({ name: '', type: '', config: '' });
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (newAgent.type) {
      const configExample = getConfigExample(newAgent.type);
      setNewAgent(prev => ({
        ...prev,
        config: JSON.stringify(configExample, null, 2)
      }));
    }
  }, [newAgent.type]);

  const handleAddAgent = () => {
    console.log('Adding new agent:', newAgent);
    // Implement the logic to add the agent to your system here
    setNewAgent({ name: '', type: '', config: '' });
  };

  const handleTypeChange = (value) => {
    setNewAgent(prev => ({ ...prev, type: value }));
  };

  const handleConfigChange = (value) => {
    setNewAgent(prev => ({ ...prev, config: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleAddAgent(); }} className="space-y-4">
      <div>
        <Label htmlFor="agentName">Agent Name</Label>
        <Input
          id="agentName"
          value={newAgent.name}
          onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="agentType">Agent Type</Label>
        <Select onValueChange={handleTypeChange} value={newAgent.type}>
          <SelectTrigger id="agentType">
            <SelectValue placeholder="Select agent type" />
          </SelectTrigger>
          <SelectContent>
            {agentTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {newAgent.type && (
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="advanced-options">
            <AccordionTrigger>Advanced Options</AccordionTrigger>
            <AccordionContent>
              {/* Add advanced options specific to the selected agent type here */}
              <p>Advanced options for {newAgent.type} go here.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <div>
        <Label htmlFor="agentConfig">Agent Configuration (JSON)</Label>
        <ConfigurationEditor
          value={newAgent.config}
          onChange={handleConfigChange}
        />
      </div>
      <Button type="submit">Add Agent</Button>
    </form>
  );
};

export default AgentCreation;