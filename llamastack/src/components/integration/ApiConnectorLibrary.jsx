import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ApiConnectorLibrary = () => {
  const [connectors, setConnectors] = useState([
    { id: 1, name: 'Stripe', version: '1.0.0', status: 'Active' },
    { id: 2, name: 'Salesforce', version: '2.1.0', status: 'Inactive' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddConnector = (newConnector) => {
    setConnectors([...connectors, { id: connectors.length + 1, ...newConnector, status: 'Inactive' }]);
  };

  const filteredConnectors = connectors.filter(connector =>
    connector.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Connector Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search connectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Connector</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New API Connector</DialogTitle>
              </DialogHeader>
              <AddConnectorForm onAdd={handleAddConnector} />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConnectors.map((connector) => (
              <TableRow key={connector.id}>
                <TableCell>{connector.name}</TableCell>
                <TableCell>{connector.version}</TableCell>
                <TableCell>{connector.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Configure</Button>
                  <Button variant="outline" size="sm">Test</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const AddConnectorForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, version });
    setName('');
    setVersion('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Connector Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="version">Version</Label>
        <Input id="version" value={version} onChange={(e) => setVersion(e.target.value)} required />
      </div>
      <Button type="submit">Add Connector</Button>
    </form>
  );
};

export default ApiConnectorLibrary;