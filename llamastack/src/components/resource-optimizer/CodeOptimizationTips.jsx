import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CodeOptimizationTips = () => {
  const [selectedWorker, setSelectedWorker] = useState('');

  // Mock optimization tips - replace with actual code analysis results
  const optimizationTips = [
    { id: 1, title: 'Use async/await', description: 'Replace callback-based code with async/await for better readability and performance.' },
    { id: 2, title: 'Optimize database queries', description: 'Use indexing and limit the number of returned fields to improve query performance.' },
    { id: 3, title: 'Implement caching', description: 'Use Cloudflare\'s KV store to cache frequently accessed data and reduce computation time.' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Optimization Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedWorker} onValueChange={setSelectedWorker}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Worker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="worker1">Worker 1</SelectItem>
              <SelectItem value="worker2">Worker 2</SelectItem>
              <SelectItem value="worker3">Worker 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {selectedWorker && (
          <div className="space-y-4">
            {optimizationTips.map((tip) => (
              <Card key={tip.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{tip.description}</p>
                  <Button variant="outline">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <Button className="mt-4">Run Code Analysis</Button>
      </CardContent>
    </Card>
  );
};

export default CodeOptimizationTips;