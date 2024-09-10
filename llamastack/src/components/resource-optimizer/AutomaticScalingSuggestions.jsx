import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AutomaticScalingSuggestions = () => {
  const [selectedWorker, setSelectedWorker] = useState('');
  const [autoScalingEnabled, setAutoScalingEnabled] = useState(false);

  // Mock scaling suggestions - replace with actual scaling logic
  const scalingSuggestions = [
    { metric: 'CPU Usage', currentThreshold: '70%', suggestedThreshold: '80%' },
    { metric: 'Memory Usage', currentThreshold: '60%', suggestedThreshold: '75%' },
    { metric: 'Request Count', currentThreshold: '1000/min', suggestedThreshold: '1500/min' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automatic Scaling Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedWorker} onValueChange={setSelectedWorker}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Worker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="worker1">Worker 1</SelectItem>
              <SelectItem value="worker2">Worker 2</SelectItem>
              <SelectItem value="worker3">Worker 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {selectedWorker && (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="auto-scaling"
                checked={autoScalingEnabled}
                onCheckedChange={setAutoScalingEnabled}
              />
              <Label htmlFor="auto-scaling">Enable Auto-scaling</Label>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Metric</th>
                  <th className="text-left">Current Threshold</th>
                  <th className="text-left">Suggested Threshold</th>
                </tr>
              </thead>
              <tbody>
                {scalingSuggestions.map((suggestion, index) => (
                  <tr key={index}>
                    <td>{suggestion.metric}</td>
                    <td>{suggestion.currentThreshold}</td>
                    <td>{suggestion.suggestedThreshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="mt-4">Apply Suggested Thresholds</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AutomaticScalingSuggestions;