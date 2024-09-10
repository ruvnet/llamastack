import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WorkflowTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customTemplateName, setCustomTemplateName] = useState('');

  const applyTemplate = () => {
    console.log('Applying template:', selectedTemplate);
    // Implement logic to apply the selected template
  };

  const saveCustomTemplate = () => {
    console.log('Saving custom template:', customTemplateName);
    // Implement logic to save the current workflow as a custom template
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="templateSelect">Select Template</Label>
            <Select onValueChange={setSelectedTemplate} value={selectedTemplate}>
              <SelectTrigger id="templateSelect">
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dataProcessing">Data Processing</SelectItem>
                <SelectItem value="notification">Notification Workflow</SelectItem>
                <SelectItem value="apiIntegration">API Integration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={applyTemplate}>Apply Template</Button>

          <div className="pt-4 border-t">
            <Label htmlFor="customTemplateName">Save as Custom Template</Label>
            <Input
              id="customTemplateName"
              value={customTemplateName}
              onChange={(e) => setCustomTemplateName(e.target.value)}
              placeholder="Enter custom template name"
            />
          </div>

          <Button onClick={saveCustomTemplate}>Save Custom Template</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowTemplates;