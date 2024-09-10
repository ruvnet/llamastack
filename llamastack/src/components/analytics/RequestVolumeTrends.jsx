import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RequestVolumeTrends = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedWorker, setSelectedWorker] = useState('all');

  // Mock data - replace with actual data fetching logic
  const data = [
    { time: '00:00', requests: 120 },
    { time: '04:00', requests: 80 },
    { time: '08:00', requests: 200 },
    { time: '12:00', requests: 350 },
    { time: '16:00', requests: 280 },
    { time: '20:00', requests: 180 },
    { time: '23:59', requests: 140 },
  ];

  const handleExport = (format) => {
    // Implement export logic here
    console.log(`Exporting data as ${format}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Volume Trends</CardTitle>
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
          <div>
            <Button onClick={() => handleExport('csv')} className="mr-2">Export CSV</Button>
            <Button onClick={() => handleExport('json')}>Export JSON</Button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="requests" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RequestVolumeTrends;