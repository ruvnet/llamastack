import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DataFlowConnectors = () => {
  const [sourceNode, setSourceNode] = useState('');
  const [targetNode, setTargetNode] = useState('');
  const [dataMapping, setDataMapping] = useState('');

  const saveConnection = () => {
    console.log('Saving data flow connection:', { sourceNode, targetNode, dataMapping });
    // Implement actual save logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Data Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="sourceNode">Source Node</Label>
            <Select onValueChange={setSourceNode} value={sourceNode}>
              <SelectTrigger id="sourceNode">
                <SelectValue placeholder="Select source node" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="node1">Node 1</SelectItem>
                <SelectItem value="node2">Node 2</SelectItem>
                <SelectItem value="node3">Node 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="targetNode">Target Node</Label>
            <Select onValueChange={setTargetNode} value={targetNode}>
              <SelectTrigger id="targetNode">
                <SelectValue placeholder="Select target node" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="node2">Node 2</SelectItem>
                <SelectItem value="node3">Node 3</SelectItem>
                <SelectItem value="node4">Node 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dataMapping">Data Mapping</Label>
            <Input
              id="dataMapping"
              value={dataMapping}
              onChange={(e) => setDataMapping(e.target.value)}
              placeholder="e.g. source.data -> target.input"
            />
          </div>

          <Button onClick={saveConnection}>Save Connection</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataFlowConnectors;