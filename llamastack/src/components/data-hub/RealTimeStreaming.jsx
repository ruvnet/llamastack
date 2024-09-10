import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RealTimeStreaming = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [updateFrequency, setUpdateFrequency] = useState(1000);
  const [data, setData] = useState([
    { name: 'A', value: 0 },
    { name: 'B', value: 0 },
    { name: 'C', value: 0 },
    { name: 'D', value: 0 },
  ]);

  useEffect(() => {
    let interval;
    if (isStreaming) {
      interval = setInterval(() => {
        setData(prevData => 
          prevData.map(item => ({
            ...item,
            value: Math.floor(Math.random() * 100)
          }))
        );
      }, updateFrequency);
    }
    return () => clearInterval(interval);
  }, [isStreaming, updateFrequency]);

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Data Streaming</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Button onClick={toggleStreaming}>
            {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
          </Button>
          <Select
            value={updateFrequency.toString()}
            onValueChange={(value) => setUpdateFrequency(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500">500ms</SelectItem>
              <SelectItem value="1000">1 second</SelectItem>
              <SelectItem value="2000">2 seconds</SelectItem>
              <SelectItem value="5000">5 seconds</SelectItem>
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
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RealTimeStreaming;