import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ActionCard from './ActionCard';

const DashboardHome = () => {
  const activeWorkersCount = 15; // Example data
  const totalRequests24h = 1000000; // Example data

  const cpuMemoryData = [
    { name: '00:00', CPU: 65, Memory: 80 },
    { name: '06:00', CPU: 70, Memory: 85 },
    { name: '12:00', CPU: 80, Memory: 90 },
    { name: '18:00', CPU: 75, Memory: 88 },
    { name: '23:59', CPU: 68, Memory: 82 },
  ];

  return (
    <div className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeWorkersCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Requests (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalRequests24h.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ActionCard
              title="Create New Agent"
              description="Start building a new LlamaStack Agent"
              icon="Code"
              link="/agents?tab=wizard"
            />
            <ActionCard
              title="Manage Sessions"
              description="View and manage your agent sessions"
              icon="Clock"
              link="/worker"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>CPU and Memory Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cpuMemoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="CPU" fill="#8884d8" />
              <Bar dataKey="Memory" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;