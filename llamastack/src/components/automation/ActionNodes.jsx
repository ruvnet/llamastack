import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ActionNodes = () => {
  const [nodeType, setNodeType] = useState('');
  const [nodeConfig, setNodeConfig] = useState({});

  const handleConfigChange = (key, value) => {
    setNodeConfig(prev => ({ ...prev, [key]: value }));
  };

  const saveNode = () => {
    console.log('Saving action node:', { type: nodeType, config: nodeConfig });
    // Implement actual save logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Action Node</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="nodeType">Node Type</Label>
            <Select onValueChange={setNodeType} value={nodeType}>
              <SelectTrigger id="nodeType">
                <SelectValue placeholder="Select node type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="worker">Worker Execution</SelectItem>
                <SelectItem value="apiCall">API Call</SelectItem>
                <SelectItem value="dataTransform">Data Transformation</SelectItem>
                <SelectItem value="conditional">Conditional Logic</SelectItem>
                <SelectItem value="loop">Loop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {nodeType === 'worker' && (
            <div>
              <Label htmlFor="workerName">Worker Name</Label>
              <Input
                id="workerName"
                value={nodeConfig.workerName || ''}
                onChange={(e) => handleConfigChange('workerName', e.target.value)}
              />
            </div>
          )}

          {nodeType === 'apiCall' && (
            <>
              <div>
                <Label htmlFor="apiEndpoint">API Endpoint</Label>
                <Input
                  id="apiEndpoint"
                  value={nodeConfig.apiEndpoint || ''}
                  onChange={(e) => handleConfigChange('apiEndpoint', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="method">HTTP Method</Label>
                <Select
                  onValueChange={(value) => handleConfigChange('method', value)}
                  value={nodeConfig.method || ''}
                >
                  <SelectTrigger id="method">
                    <SelectValue placeholder="Select HTTP method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {nodeType === 'dataTransform' && (
            <div>
              <Label htmlFor="transformationCode">Transformation Code</Label>
              <Textarea
                id="transformationCode"
                value={nodeConfig.transformationCode || ''}
                onChange={(e) => handleConfigChange('transformationCode', e.target.value)}
                rows={5}
              />
            </div>
          )}

          {nodeType === 'conditional' && (
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                value={nodeConfig.condition || ''}
                onChange={(e) => handleConfigChange('condition', e.target.value)}
                placeholder="e.g. data.value > 10"
              />
            </div>
          )}

          {nodeType === 'loop' && (
            <div>
              <Label htmlFor="loopType">Loop Type</Label>
              <Select
                onValueChange={(value) => handleConfigChange('loopType', value)}
                value={nodeConfig.loopType || ''}
              >
                <SelectTrigger id="loopType">
                  <SelectValue placeholder="Select loop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forEachItem">For Each Item</SelectItem>
                  <SelectItem value="whileCondition">While Condition</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button onClick={saveNode}>Save Node</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionNodes;