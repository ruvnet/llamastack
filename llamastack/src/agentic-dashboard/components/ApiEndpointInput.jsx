import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ApiEndpointInput = ({ apiEndpoint, apiKey, setApiEndpoint, setApiKey, handleApiEndpointSubmit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set LlamaStack API Endpoint</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiEndpoint">API Endpoint</Label>
            <Input
              id="apiEndpoint"
              type="text"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              placeholder="Enter LlamaStack API endpoint"
            />
          </div>
          <div>
            <Label htmlFor="apiKey">API Key (Optional)</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key (optional)"
            />
          </div>
          <Button onClick={handleApiEndpointSubmit}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiEndpointInput;