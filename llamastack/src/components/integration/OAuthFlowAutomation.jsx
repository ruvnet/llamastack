import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OAuthFlowAutomation = () => {
  const [oauthConnections, setOauthConnections] = useState([
    { id: 1, service: 'Google', status: 'Connected', scopes: ['profile', 'email'], expiresAt: '2023-12-31' },
    { id: 2, service: 'Twitter', status: 'Disconnected', scopes: [], expiresAt: 'N/A' },
  ]);

  const handleAddOAuthConnection = (newConnection) => {
    setOauthConnections([...oauthConnections, { id: oauthConnections.length + 1, ...newConnection, status: 'Connected', expiresAt: '2024-03-15' }]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>OAuth Flow Automation</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Add OAuth Connection</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add OAuth Connection</DialogTitle>
            </DialogHeader>
            <AddOAuthConnectionForm onAdd={handleAddOAuthConnection} />
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Scopes</TableHead>
              <TableHead>Expires At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {oauthConnections.map((connection) => (
              <TableRow key={connection.id}>
                <TableCell>{connection.service}</TableCell>
                <TableCell>{connection.status}</TableCell>
                <TableCell>{connection.scopes.join(', ')}</TableCell>
                <TableCell>{connection.expiresAt}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Refresh Token</Button>
                  <Button variant="outline" size="sm">Revoke Access</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const AddOAuthConnectionForm = ({ onAdd }) => {
  const [service, setService] = useState('');
  const [scopes, setScopes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ service, scopes });
    setService('');
    setScopes([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="service">OAuth Service</Label>
        <Select onValueChange={setService} value={service}>
          <SelectTrigger id="service">
            <SelectValue placeholder="Select OAuth service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="scopes">Scopes</Label>
        <Select onValueChange={(value) => setScopes([...scopes, value])} value="">
          <SelectTrigger id="scopes">
            <SelectValue placeholder="Select scopes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="profile">Profile</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="write">Write</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        Selected scopes: {scopes.join(', ')}
      </div>
      <Button type="submit">Add OAuth Connection</Button>
    </form>
  );
};

export default OAuthFlowAutomation;