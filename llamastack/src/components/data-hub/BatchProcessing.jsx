import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Play } from 'lucide-react';

const BatchProcessing = () => {
  const [batchJobs, setBatchJobs] = useState([
    { id: 1, name: 'Daily User Report', schedule: '0 0 * * *', source: 'User Data', pipeline: 'User Analytics', destination: 'Reports KV' },
    { id: 2, name: 'Weekly Log Analysis', schedule: '0 0 * * 0', source: 'Server Logs', pipeline: 'Log Processing', destination: 'Analytics R2' },
  ]);

  const [newJob, setNewJob] = useState({ name: '', schedule: '', source: '', pipeline: '', destination: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setBatchJobs(prev => prev.map(job => job.id === editingId ? { ...newJob, id: editingId } : job));
    } else {
      setBatchJobs(prev => [...prev, { ...newJob, id: Date.now() }]);
    }
    setNewJob({ name: '', schedule: '', source: '', pipeline: '', destination: '' });
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleEdit = (job) => {
    setNewJob(job);
    setEditingId(job.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setBatchJobs(prev => prev.filter(job => job.id !== id));
  };

  const handleRunNow = (id) => {
    // Implement the logic to run the batch job immediately
    console.log(`Running batch job ${id} now`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Processing</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Pipeline</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batchJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.schedule}</TableCell>
                <TableCell>{job.source}</TableCell>
                <TableCell>{job.pipeline}</TableCell>
                <TableCell>{job.destination}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(job)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="mr-2" onClick={() => handleDelete(job.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleRunNow(job.id)}>
                    <Play className="h-4 w-4" />
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
              Add New Batch Job
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Batch Job' : 'Add New Batch Job'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={newJob.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="schedule">Schedule (Cron Expression)</Label>
                <Input id="schedule" name="schedule" value={newJob.schedule} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="source">Data Source</Label>
                <Input id="source" name="source" value={newJob.source} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="pipeline">Processing Pipeline</Label>
                <Input id="pipeline" name="pipeline" value={newJob.pipeline} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="destination">Output Destination</Label>
                <Input id="destination" name="destination" value={newJob.destination} onChange={handleInputChange} required />
              </div>
              <Button type="submit">{editingId ? 'Update' : 'Add'} Batch Job</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BatchProcessing;