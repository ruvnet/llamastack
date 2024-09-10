import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ApiUsageAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedApi, setSelectedApi] = useState('all');

  // Mock data - replace with actual API usage data
  const data = [
    { name: 'Mon', calls: 4000, errors: 400 },
    { name: 'Tue', calls: 3000, errors: 300 },
    { name: 'Wed', calls: 2000, errors: 200 },
    { name: 'Thu', calls: 2780, errors: 278 },
    { name: 'Fri', calls: 1890, errors: 189 },
    { name: 'Sat', calls: 2390, errors: 239 },
    { name: 'Sun', calls: 3490, errors: 349 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Usage Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedApi} onValueChange={setSelectedApi}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select API" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All APIs</SelectItem>
              <SelectItem value="stripe">Stripe API</SelectItem>
              <SelectItem value="salesforce">Salesforce API</SelectItem>
              <SelectItem value="github">GitHub API</SelectItem>
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
            <Bar dataKey="calls" fill="#8884d8" name="API Calls" />
            <Bar dataKey="errors" fill="#82ca9d" name="Errors" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Summary</h3>
          <p>Total API Calls: 19,550</p>
          <p>Error Rate: 10%</p>
          <p>Average Response Time: 250ms</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiUsageAnalytics;