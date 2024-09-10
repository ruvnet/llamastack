import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CustomAlerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, name: 'High CPU Usage', metric: 'CPU', threshold: 90, status: 'Active' },
    { id: 2, name: 'Error Rate Spike', metric: 'Error Rate', threshold: 5, status: 'Active' },
  ]);

  const [newAlert, setNewAlert] = useState({ name: '', metric: '', threshold: '', status: 'Active' });

  const handleAddAlert = () => {
    if (newAlert.name && newAlert.metric && newAlert.threshold) {
      setAlerts([...alerts, { ...newAlert, id: Date.now() }]);
      setNewAlert({ name: '', metric: '', threshold: '', status: 'Active' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mb-4">
          <div>
            <Label htmlFor="alertName">Alert Name</Label>
            <Input
              id="alertName"
              value={newAlert.name}
              onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
              placeholder="Enter alert name"
            />
          </div>
          <div>
            <Label htmlFor="metric">Metric</Label>
            <Select
              value={newAlert.metric}
              onValueChange={(value) => setNewAlert({ ...newAlert, metric: value })}
            >
              <SelectTrigger id="metric">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CPU">CPU Usage</SelectItem>
                <SelectItem value="Memory">Memory Usage</SelectItem>
                <SelectItem value="Error Rate">Error Rate</SelectItem>
                <SelectItem value="Response Time">Response Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="threshold">Threshold</Label>
            <Input
              id="threshold"
              type="number"
              value={newAlert.threshold}
              onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
              placeholder="Enter threshold value"
            />
          </div>
          <Button onClick={handleAddAlert}>Add Alert</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Metric</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{alert.name}</TableCell>
                <TableCell>{alert.metric}</TableCell>
                <TableCell>{alert.threshold}</TableCell>
                <TableCell>{alert.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Edit</Button>
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

export default CustomAlerts;