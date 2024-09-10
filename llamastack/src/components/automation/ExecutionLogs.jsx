import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ExecutionLogs = () => {
  const [logs, setLogs] = useState([
    { id: 1, workflow: 'Data Processing', status: 'Completed', startTime: '2023-03-15 10:00:00', duration: '5m 30s' },
    { id: 2, workflow: 'Notification', status: 'Failed', startTime: '2023-03-15 11:30:00', duration: '2m 15s' },
    { id: 3, workflow: 'API Integration', status: 'Running', startTime: '2023-03-15 12:45:00', duration: 'Ongoing' },
  ]);

  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(log => 
    log.workflow.toLowerCase().includes(filter.toLowerCase()) ||
    log.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Filter logs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.workflow}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.startTime}</TableCell>
                <TableCell>{log.duration}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExecutionLogs;