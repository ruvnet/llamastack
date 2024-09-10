import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfigurationEditor from './ConfigurationEditor';
import { agentTypes, getConfigExample } from './agentUtils';

const AgentWizard = () => {
  const [step, setStep] = useState(1);
  const [agentData, setAgentData] = useState({
    name: '',
    type: '',
    description: '',
    config: '',
  });

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const handleFinish = () => console.log('Agent created:', agentData);

  const handleInputChange = (field, value) => {
    setAgentData({ ...agentData, [field]: value });
    if (field === 'type') {
      setAgentData(prev => ({ ...prev, config: getConfigExample(value) }));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo agentData={agentData} handleInputChange={handleInputChange} />;
      case 2:
        return <AgentDescription agentData={agentData} handleInputChange={handleInputChange} />;
      case 3:
        return <Configuration agentData={agentData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs value={`step-${step}`} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="step-1">Basic Info</TabsTrigger>
          <TabsTrigger value="step-2">Description</TabsTrigger>
          <TabsTrigger value="step-3">Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value={`step-${step}`}>
          <Card>
            <CardHeader>
              <CardTitle>{`Step ${step}: ${['Basic Information', 'Agent Description', 'Configuration'][step - 1]}`}</CardTitle>
              <CardDescription>Let's set up your agent step by step.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderStep()}
              <div className="flex justify-between">
                {step > 1 && <Button onClick={handlePrevious}>Previous</Button>}
                {step < 3 ? <Button onClick={handleNext}>Next</Button> : <Button onClick={handleFinish}>Finish</Button>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const BasicInfo = ({ agentData, handleInputChange }) => (
  <>
    <div>
      <Label htmlFor="agentName">Agent Name</Label>
      <Input
        id="agentName"
        value={agentData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        required
      />
    </div>
    <div>
      <Label htmlFor="agentType">Agent Type</Label>
      <Select onValueChange={(value) => handleInputChange('type', value)}>
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
  </>
);

const AgentDescription = ({ agentData, handleInputChange }) => (
  <div>
    <Label htmlFor="agentDescription">Description</Label>
    <Textarea
      id="agentDescription"
      value={agentData.description}
      onChange={(e) => handleInputChange('description', e.target.value)}
      rows={4}
      required
    />
  </div>
);

const Configuration = ({ agentData, handleInputChange }) => (
  <div>
    <Label htmlFor="agentConfig">Configuration (JSON)</Label>
    <ConfigurationEditor
      value={agentData.config}
      onChange={(value) => handleInputChange('config', value)}
      agentType={agentData.type}
    />
  </div>
);

export default AgentWizard;