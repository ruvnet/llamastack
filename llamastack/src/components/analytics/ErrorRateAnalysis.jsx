import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ErrorRateAnalysis = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedWorker, setSelectedWorker] = useState('all');

  // Mock data - replace with actual data fetching logic
  const data = [
    { name: '4xx Errors', count: 120 },
    { name: '5xx Errors', count: 80 },
    { name: 'Timeout Errors', count: 50 },
    { name: 'Script Errors', count: 30 },
  ];

  const handleDrillDown = (errorType) => {
    // Implement drill-down logic here
    console.log(`Drilling down into ${errorType}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Rate Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last 1 hour</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedWorker} onValueChange={setSelectedWorker}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select worker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Workers</SelectItem>
              <SelectItem value="worker1">Worker 1</SelectItem>
              <SelectItem value="worker2">Worker 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" onClick={(data) => handleDrillDown(data.name)} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <Button onClick={() => console.log('Setting up custom error alert')}>Set Up Custom Alert</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorRateAnalysis;