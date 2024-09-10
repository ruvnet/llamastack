import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const IdleWorkerDetection = () => {
  const [idleThreshold, setIdleThreshold] = useState(5);

  // Mock idle workers data - replace with actual detection logic
  const idleWorkers = [
    { id: 1, name: 'Worker A', lastActive: '3 days ago', avgRequestsPerHour: 0.2 },
    { id: 2, name: 'Worker B', lastActive: '1 week ago', avgRequestsPerHour: 0.1 },
    { id: 3, name: 'Worker C', lastActive: '2 days ago', avgRequestsPerHour: 0.5 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Idle Worker Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Label htmlFor="idle-threshold">Idle Threshold (requests/hour):</Label>
          <Input
            id="idle-threshold"
            type="number"
            value={idleThreshold}
            onChange={(e) => setIdleThreshold(e.target.value)}
            className="w-20"
          />
          <Button>Update Threshold</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Worker Name</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Avg Requests/Hour</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {idleWorkers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{worker.lastActive}</TableCell>
                <TableCell>{worker.avgRequestsPerHour}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                  <Button variant="destructive" size="sm">Deactivate</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default IdleWorkerDetection;