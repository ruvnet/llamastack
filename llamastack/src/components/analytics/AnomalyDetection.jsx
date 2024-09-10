import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const AnomalyDetection = () => {
  const [sensitivity, setSensitivity] = useState(50);
  const [metric, setMetric] = useState('');

  const anomalies = [
    { id: 1, metric: 'CPU Usage', timestamp: '2023-03-15 14:30:00', value: '95%', severity: 'High' },
    { id: 2, metric: 'Error Rate', timestamp: '2023-03-15 10:15:00', value: '10%', severity: 'Medium' },
  ];

  const handleSensitivityChange = (value) => {
    setSensitivity(value[0]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="metric">Select Metric</Label>
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger id="metric">
                <SelectValue placeholder="Select metric for anomaly detection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpu">CPU Usage</SelectItem>
                <SelectItem value="memory">Memory Usage</SelectItem>
                <SelectItem value="errorRate">Error Rate</SelectItem>
                <SelectItem value="latency">Latency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sensitivity">Detection Sensitivity</Label>
            <Slider
              id="sensitivity"
              min={0}
              max={100}
              step={1}
              value={[sensitivity]}
              onValueChange={handleSensitivityChange}
            />
            <p className="text-sm text-gray-500 mt-1">Current sensitivity: {sensitivity}%</p>
          </div>
          <Button>Apply Settings</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Detected Anomalies</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anomalies.map((anomaly) => (
                <TableRow key={anomaly.id}>
                  <TableCell>{anomaly.metric}</TableCell>
                  <TableCell>{anomaly.timestamp}</TableCell>
                  <TableCell>{anomaly.value}</TableCell>
                  <TableCell>{anomaly.severity}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Investigate</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetection;