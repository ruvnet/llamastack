import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataSources from '@/components/data-hub/DataSources';
import AggregationRules from '@/components/data-hub/AggregationRules';
import TransformationPipeline from '@/components/data-hub/TransformationPipeline';
import OutputDestinations from '@/components/data-hub/OutputDestinations';
import RealTimeStreaming from '@/components/data-hub/RealTimeStreaming';
import BatchProcessing from '@/components/data-hub/BatchProcessing';
import DataVisualization from '@/components/data-hub/DataVisualization';

const Data = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Aggregation Hub</h1>
      <Tabs defaultValue="sources">
        <TabsList className="mb-4">
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="rules">Aggregation Rules</TabsTrigger>
          <TabsTrigger value="pipeline">Transformation Pipeline</TabsTrigger>
          <TabsTrigger value="output">Output Destinations</TabsTrigger>
          <TabsTrigger value="streaming">Real-time Streaming</TabsTrigger>
          <TabsTrigger value="batch">Batch Processing</TabsTrigger>
          <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
        </TabsList>
        <TabsContent value="sources">
          <DataSources />
        </TabsContent>
        <TabsContent value="rules">
          <AggregationRules />
        </TabsContent>
        <TabsContent value="pipeline">
          <TransformationPipeline />
        </TabsContent>
        <TabsContent value="output">
          <OutputDestinations />
        </TabsContent>
        <TabsContent value="streaming">
          <RealTimeStreaming />
        </TabsContent>
        <TabsContent value="batch">
          <BatchProcessing />
        </TabsContent>
        <TabsContent value="visualization">
          <DataVisualization />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Data;