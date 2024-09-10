import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CostProjectionTools = () => {
  const [projectionPeriod, setProjectionPeriod] = useState('1m');
  const [growthRate, setGrowthRate] = useState(5);

  // Mock data - replace with actual projection logic
  const data = [
    { name: 'Current', Workers: 400, KV: 100, DurableObjects: 200 },
    { name: 'Projected', Workers: 420, KV: 105, DurableObjects: 210 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Projection Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Select value={projectionPeriod} onValueChange={setProjectionPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Projection period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center">
            <span className="mr-2">Growth Rate:</span>
            <Input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              className="w-20"
            />
            <span className="ml-1">%</span>
          </div>
          <Button>Calculate Projection</Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Workers" fill="#8884d8" />
            <Bar dataKey="KV" fill="#82ca9d" />
            <Bar dataKey="DurableObjects" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CostProjectionTools;