import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OptimizationRecommendations = () => {
  // Mock recommendations - replace with actual recommendation logic
  const recommendations = [
    { id: 1, title: 'Optimize Worker A CPU usage', description: 'Worker A is using excessive CPU. Consider refactoring the code to reduce computational complexity.' },
    { id: 2, title: 'Increase KV cache hit rate', description: 'KV operations for Worker B have a low cache hit rate. Consider implementing a caching strategy to improve performance.' },
    { id: 3, title: 'Consolidate similar Workers', description: 'Workers C and D have similar functionality. Consider merging them to reduce resource usage.' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardHeader>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{rec.description}</p>
                <div className="flex space-x-2">
                  <Button variant="outline">View Details</Button>
                  <Button>Apply Recommendation</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimizationRecommendations;