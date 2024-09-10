import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WebhookManagement = () => {
  const [webhooks, setWebhooks] = useState([
    { id: 1, name: 'New Order', endpoint: 'https://example.com/webhook', events: ['order.created'] },
    { id: 2, name: 'Payment Received', endpoint: 'https://example.com/payment', events: ['payment.success'] },
  ]);

  const handleAddWebhook = (newWebhook) => {
    setWebhooks([...webhooks, { id: webhooks.length + 1, ...newWebhook }]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Create New Webhook</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Webhook</DialogTitle>
            </DialogHeader>
            <AddWebhookForm onAdd={handleAddWebhook} />
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map((webhook) => (
              <TableRow key={webhook.id}>
                <TableCell>{webhook.name}</TableCell>
                <TableCell>{webhook.endpoint}</TableCell>
                <TableCell>{webhook.events.join(', ')}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                  <Button variant="outline" size="sm" className="mr-2">Test</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const AddWebhookForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [events, setEvents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, endpoint, events });
    setName('');
    setEndpoint('');
    setEvents([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Webhook Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="endpoint">Endpoint URL</Label>
        <Input id="endpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="events">Events</Label>
        <Select onValueChange={(value) => setEvents([...events, value])} value="">
          <SelectTrigger id="events">
            <SelectValue placeholder="Select events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="order.created">Order Created</SelectItem>
            <SelectItem value="payment.success">Payment Success</SelectItem>
            <SelectItem value="user.registered">User Registered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        Selected events: {events.join(', ')}
      </div>
      <Button type="submit">Create Webhook</Button>
    </form>
  );
};

export default WebhookManagement;