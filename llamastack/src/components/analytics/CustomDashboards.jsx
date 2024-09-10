import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CustomDashboards = () => {
  const [dashboards, setDashboards] = useState([
    { id: 1, name: 'Overview Dashboard' },
    { id: 2, name: 'Performance Dashboard' },
  ]);

  const [newDashboardName, setNewDashboardName] = useState('');

  const handleAddDashboard = () => {
    if (newDashboardName) {
      setDashboards([...dashboards, { id: Date.now(), name: newDashboardName }]);
      setNewDashboardName('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Dashboards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="dashboardName">New Dashboard Name</Label>
          <div className="flex space-x-2">
            <Input
              id="dashboardName"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              placeholder="Enter dashboard name"
            />
            <Button onClick={handleAddDashboard}>Add Dashboard</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboards.map((dashboard) => (
            <Card key={dashboard.id}>
              <CardHeader>
                <CardTitle>{dashboard.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Edit Dashboard</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomDashboards;