import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CustomConnectorBuilder = () => {
  const [connectorName, setConnectorName] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [authType, setAuthType] = useState('');
  const [endpoints, setEndpoints] = useState([]);

  const handleAddEndpoint = () => {
    setEndpoints([...endpoints, { path: '', method: 'GET', params: [] }]);
  };

  const handleEndpointChange = (index, field, value) => {
    const updatedEndpoints = [...endpoints];
    updatedEndpoints[index][field] = value;
    setEndpoints(updatedEndpoints);
  };

  const handleSaveConnector = () => {
    // Implement logic to save the custom connector
    console.log('Saving connector:', { connectorName, baseUrl, authType, endpoints });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Connector Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="connectorName">Connector Name</Label>
            <Input
              id="connectorName"
              value={connectorName}
              onChange={(e) => setConnectorName(e.target.value)}
              placeholder="Enter connector name"
            />
          </div>
          <div>
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.example.com"
            />
          </div>
          <div>
            <Label htmlFor="authType">Authentication Type</Label>
            <Select onValueChange={setAuthType} value={authType}>
              <SelectTrigger id="authType">
                <SelectValue placeholder="Select auth type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
                <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                <SelectItem value="apiKey">API Key</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Endpoints</Label>
            {endpoints.map((endpoint, index) => (
              <div key={index} className="space-y-2 mt-2">
                <Input
                  value={endpoint.path}
                  onChange={(e) => handleEndpointChange(index, 'path', e.target.value)}
                  placeholder="Endpoint path (e.g., /users)"
                />
                <Select
                  value={endpoint.method}
                  onValueChange={(value) => handleEndpointChange(index, 'method', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="HTTP Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
            <Button type="button" onClick={handleAddEndpoint} className="mt-2">
              Add Endpoint
            </Button>
          </div>
          <Button type="button" onClick={handleSaveConnector}>Save Connector</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomConnectorBuilder;