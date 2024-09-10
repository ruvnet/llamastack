import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResourceComparisonTools = () => {
  const [worker1, setWorker1] = useState('');
  const [worker2, setWorker2] = useState('');

  // Mock comparison data - replace with actual comparison logic
  const comparisonData = [
    { metric: 'CPU Usage', Worker1: 70, Worker2: 60 },
    { metric: 'Memory Usage', Worker1: 80, Worker2: 75 },
    { metric: 'Requests/min', Worker1: 1000, Worker2: 1200 },
    { metric: 'Avg Response Time', Worker1: 50, Worker2: 45 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Comparison Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Select value={worker1} onValueChange={setWorker1}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Worker 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="worker1">Worker 1</SelectItem>
              <SelectItem value="worker2">Worker 2</SelectItem>
              <SelectItem value="worker3">Worker 3</SelectItem>
            </SelectContent>
          </Select>
          <Select value={worker2} onValueChange={setWorker2}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Worker 2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="worker1">Worker 1</SelectItem>
              <SelectItem value="worker2">Worker 2</SelectItem>
              <SelectItem value="worker3">Worker 3</SelectItem>
            </SelectContent>
          </Select>
          <Button>Compare</Button>
        </div>
        {worker1 && worker2 && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Worker1" fill="#8884d8" />
              <Bar dataKey="Worker2" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceComparisonTools;