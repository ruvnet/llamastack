import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Worker = () => {
  const mockWorkers = [
    { id: 1, name: 'Worker 1', status: 'Active', lastDeployed: '2023-03-15', routes: '/api/worker1/*' },
    { id: 2, name: 'Worker 2', status: 'Inactive', lastDeployed: '2023-03-10', routes: '/api/worker2/*' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Worker Management</h1>
      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Workers List</TabsTrigger>
          <TabsTrigger value="create">Create/Edit Worker</TabsTrigger>
          <TabsTrigger value="settings">Worker Settings</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Workers List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Deployed</TableHead>
                    <TableHead>Routes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWorkers.map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell>{worker.name}</TableCell>
                      <TableCell>{worker.status}</TableCell>
                      <TableCell>{worker.lastDeployed}</TableCell>
                      <TableCell>{worker.routes}</TableCell>
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
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create/Edit Worker</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="workerName">Worker Name</Label>
                  <Input id="workerName" placeholder="Enter worker name" />
                </div>
                <div>
                  <Label htmlFor="workerCode">Worker Code</Label>
                  <Textarea id="workerCode" placeholder="Enter worker code" rows={10} />
                </div>
                <Button type="submit">Save Worker</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Worker Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="compatibilityDate">Compatibility Date</Label>
                  <Input id="compatibilityDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="environment">Environment</Label>
                  <Select>
                    <SelectTrigger id="environment">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">Save Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <CardTitle>Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="deploymentTarget">Deployment Target</Label>
                  <Select>
                    <SelectTrigger id="deploymentTarget">
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="versionNotes">Version Notes</Label>
                  <Textarea id="versionNotes" placeholder="Enter version notes" rows={4} />
                </div>
                <Button type="submit">Deploy</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Monitoring charts and data will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Worker logs will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Worker;