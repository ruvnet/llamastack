import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ThirdPartyIntegrations = () => {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Slack', status: 'Connected', lastSync: '2023-03-15 10:30:00' },
    { id: 2, name: 'GitHub', status: 'Disconnected', lastSync: 'N/A' },
  ]);

  const handleAddIntegration = (newIntegration) => {
    setIntegrations([...integrations, { id: integrations.length + 1, ...newIntegration, status: 'Connected', lastSync: new Date().toLocaleString() }]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Third-party Service Integrations</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Add New Integration</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
            </DialogHeader>
            <AddIntegrationForm onAdd={handleAddIntegration} />
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Sync</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {integrations.map((integration) => (
              <TableRow key={integration.id}>
                <TableCell>{integration.name}</TableCell>
                <TableCell>{integration.status}</TableCell>
                <TableCell>{integration.lastSync}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Configure</Button>
                  <Button variant="outline" size="sm" className="mr-2">Sync Now</Button>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const AddIntegrationForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, service });
    setName('');
    setService('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Integration Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="service">Service</Label>
        <Select onValueChange={setService} value={service}>
          <SelectTrigger id="service">
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="slack">Slack</SelectItem>
            <SelectItem value="github">GitHub</SelectItem>
            <SelectItem value="salesforce">Salesforce</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Integration</Button>
    </form>
  );
};

export default ThirdPartyIntegrations;