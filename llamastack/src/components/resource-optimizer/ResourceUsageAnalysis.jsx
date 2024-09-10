import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResourceUsageAnalysis = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedWorker, setSelectedWorker] = useState('all');

  // Mock data - replace with actual data fetching logic
  const data = [
    { name: '00:00', CPU: 65, Memory: 80, Requests: 1000 },
    { name: '06:00', CPU: 70, Memory: 85, Requests: 1200 },
    { name: '12:00', CPU: 80, Memory: 90, Requests: 1500 },
    { name: '18:00', CPU: 75, Memory: 88, Requests: 1300 },
    { name: '23:59', CPU: 68, Memory: 82, Requests: 1100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Usage Analysis</CardTitle>
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
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="CPU" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="left" type="monotone" dataKey="Memory" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="Requests" stroke="#ffc658" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ResourceUsageAnalysis;