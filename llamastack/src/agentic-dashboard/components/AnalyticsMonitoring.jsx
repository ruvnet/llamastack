import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const dummyData = [
  { name: 'Jan', agents: 4000, sessions: 2400, amt: 2400 },
  { name: 'Feb', agents: 3000, sessions: 1398, amt: 2210 },
  { name: 'Mar', agents: 2000, sessions: 9800, amt: 2290 },
  { name: 'Apr', agents: 2780, sessions: 3908, amt: 2000 },
  { name: 'May', agents: 1890, sessions: 4800, amt: 2181 },
  { name: 'Jun', agents: 2390, sessions: 3800, amt: 2500 },
  { name: 'Jul', agents: 3490, sessions: 4300, amt: 2100 },
];

const AnalyticsMonitoring = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics and Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          width={600}
          height={300}
          data={dummyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="agents" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="sessions" stroke="#82ca9d" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default AnalyticsMonitoring;