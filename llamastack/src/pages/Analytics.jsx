import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestVolumeTrends from '@/components/analytics/RequestVolumeTrends';
import ErrorRateAnalysis from '@/components/analytics/ErrorRateAnalysis';
import PerformanceMetrics from '@/components/analytics/PerformanceMetrics';
import CostAnalysis from '@/components/analytics/CostAnalysis';
import CustomAlerts from '@/components/analytics/CustomAlerts';
import CustomDashboards from '@/components/analytics/CustomDashboards';
import ExportReports from '@/components/analytics/ExportReports';
import AnomalyDetection from '@/components/analytics/AnomalyDetection';

const Analytics = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics & Monitoring</h1>
      <Tabs defaultValue="request-volume">
        <TabsList className="mb-4">
          <TabsTrigger value="request-volume">Request Volume</TabsTrigger>
          <TabsTrigger value="error-rate">Error Rate</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          <TabsTrigger value="alerts">Custom Alerts</TabsTrigger>
          <TabsTrigger value="dashboards">Custom Dashboards</TabsTrigger>
          <TabsTrigger value="reports">Export Reports</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
        </TabsList>
        <TabsContent value="request-volume">
          <RequestVolumeTrends />
        </TabsContent>
        <TabsContent value="error-rate">
          <ErrorRateAnalysis />
        </TabsContent>
        <TabsContent value="performance">
          <PerformanceMetrics />
        </TabsContent>
        <TabsContent value="cost">
          <CostAnalysis />
        </TabsContent>
        <TabsContent value="alerts">
          <CustomAlerts />
        </TabsContent>
        <TabsContent value="dashboards">
          <CustomDashboards />
        </TabsContent>
        <TabsContent value="reports">
          <ExportReports />
        </TabsContent>
        <TabsContent value="anomalies">
          <AnomalyDetection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;