import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TriggerTypes = () => {
  const [triggerType, setTriggerType] = useState('');
  const [triggerConfig, setTriggerConfig] = useState({});

  const handleConfigChange = (key, value) => {
    setTriggerConfig(prev => ({ ...prev, [key]: value }));
  };

  const saveTrigger = () => {
    console.log('Saving trigger:', { type: triggerType, config: triggerConfig });
    // Implement actual save logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Trigger</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="triggerType">Trigger Type</Label>
            <Select onValueChange={setTriggerType} value={triggerType}>
              <SelectTrigger id="triggerType">
                <SelectValue placeholder="Select trigger type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="http">HTTP Request</SelectItem>
                <SelectItem value="scheduled">Scheduled (Cron)</SelectItem>
                <SelectItem value="event">Event-based</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {triggerType === 'http' && (
            <div>
              <Label htmlFor="endpoint">Endpoint</Label>
              <Input
                id="endpoint"
                value={triggerConfig.endpoint || ''}
                onChange={(e) => handleConfigChange('endpoint', e.target.value)}
              />
            </div>
          )}

          {triggerType === 'scheduled' && (
            <div>
              <Label htmlFor="cronExpression">Cron Expression</Label>
              <Input
                id="cronExpression"
                value={triggerConfig.cronExpression || ''}
                onChange={(e) => handleConfigChange('cronExpression', e.target.value)}
              />
            </div>
          )}

          {triggerType === 'event' && (
            <div>
              <Label htmlFor="eventType">Event Type</Label>
              <Select
                onValueChange={(value) => handleConfigChange('eventType', value)}
                value={triggerConfig.eventType || ''}
              >
                <SelectTrigger id="eventType">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kvChange">KV Change</SelectItem>
                  <SelectItem value="r2ObjectUpdate">R2 Object Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button onClick={saveTrigger}>Save Trigger</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerTypes;