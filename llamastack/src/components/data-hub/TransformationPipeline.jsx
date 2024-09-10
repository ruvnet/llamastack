import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from 'lucide-react';

const TransformationPipeline = () => {
  const [pipelines, setPipelines] = useState([
    { id: 1, name: 'User Data Cleansing', steps: ['Filter', 'Map', 'Reduce'], input: 'Raw User Data', output: 'Cleaned User Data' },
    { id: 2, name: 'Log Analysis', steps: ['Parse', 'Filter', 'Aggregate'], input: 'Server Logs', output: 'Error Summary' },
  ]);

  const [newPipeline, setNewPipeline] = useState({ name: '', steps: [], input: '', output: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPipeline(prev => ({ ...prev, [name]: value }));
  };

  const handleStepsChange = (value) => {
    setNewPipeline(prev => ({ ...prev, steps: value.split(',').map(step => step.trim()) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setPipelines(prev => prev.map(pipeline => pipeline.id === editingId ? { ...newPipeline, id: editingId } : pipeline));
    } else {
      setPipelines(prev => [...prev, { ...newPipeline, id: Date.now() }]);
    }
    setNewPipeline({ name: '', steps: [], input: '', output: '' });
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleEdit = (pipeline) => {
    setNewPipeline({ ...pipeline, steps: pipeline.steps.join(', ') });
    setEditingId(pipeline.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setPipelines(prev => prev.filter(pipeline => pipeline.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transformation Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Steps</TableHead>
              <TableHead>Input</TableHead>
              <TableHead>Output</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pipelines.map((pipeline) => (
              <TableRow key={pipeline.id}>
                <TableCell>{pipeline.name}</TableCell>
                <TableCell>{pipeline.steps.join(' → ')}</TableCell>
                <TableCell>{pipeline.input}</TableCell>
                <TableCell>{pipeline.output}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(pipeline)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(pipeline.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add New Pipeline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Pipeline' : 'Add New Pipeline'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={newPipeline.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="steps">Steps (comma-separated)</Label>
                <Input id="steps" name="steps" value={newPipeline.steps} onChange={(e) => handleStepsChange(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="input">Input</Label>
                <Input id="input" name="input" value={newPipeline.input} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="output">Output</Label>
                <Input id="output" name="output" value={newPipeline.output} onChange={handleInputChange} required />
              </div>
              <Button type="submit">{editingId ? 'Update' : 'Add'} Pipeline</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TransformationPipeline;