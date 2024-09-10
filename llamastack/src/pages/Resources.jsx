import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceUsageAnalysis from '@/components/resource-optimizer/ResourceUsageAnalysis';
import CostProjectionTools from '@/components/resource-optimizer/CostProjectionTools';
import OptimizationRecommendations from '@/components/resource-optimizer/OptimizationRecommendations';
import AutomaticScalingSuggestions from '@/components/resource-optimizer/AutomaticScalingSuggestions';
import IdleWorkerDetection from '@/components/resource-optimizer/IdleWorkerDetection';
import CodeOptimizationTips from '@/components/resource-optimizer/CodeOptimizationTips';
import ResourceComparisonTools from '@/components/resource-optimizer/ResourceComparisonTools';

const Resources = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resource Optimizer</h1>
      <Tabs defaultValue="usage">
        <TabsList className="mb-4">
          <TabsTrigger value="usage">Usage Analysis</TabsTrigger>
          <TabsTrigger value="cost">Cost Projection</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="scaling">Scaling</TabsTrigger>
          <TabsTrigger value="idle">Idle Workers</TabsTrigger>
          <TabsTrigger value="code">Code Tips</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        <TabsContent value="usage">
          <ResourceUsageAnalysis />
        </TabsContent>
        <TabsContent value="cost">
          <CostProjectionTools />
        </TabsContent>
        <TabsContent value="optimization">
          <OptimizationRecommendations />
        </TabsContent>
        <TabsContent value="scaling">
          <AutomaticScalingSuggestions />
        </TabsContent>
        <TabsContent value="idle">
          <IdleWorkerDetection />
        </TabsContent>
        <TabsContent value="code">
          <CodeOptimizationTips />
        </TabsContent>
        <TabsContent value="comparison">
          <ResourceComparisonTools />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;