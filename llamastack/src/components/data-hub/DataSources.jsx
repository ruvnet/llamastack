import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from 'lucide-react';

const DataSources = () => {
  const [dataSources, setDataSources] = useState([
    { id: 1, name: 'Worker 1', type: 'Worker', config: 'https://api.example.com/worker1', frequency: '5m' },
    { id: 2, name: 'KV Store', type: 'KV', config: 'my-kv-namespace', frequency: '1h' },
    { id: 3, name: 'External API', type: 'External API', config: 'https://api.external.com/data', frequency: '30m' },
  ]);

  const [newSource, setNewSource] = useState({ name: '', type: '', config: '', frequency: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSource(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewSource(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDataSources(prev => prev.map(source => source.id === editingId ? { ...newSource, id: editingId } : source));
    } else {
      setDataSources(prev => [...prev, { ...newSource, id: Date.now() }]);
    }
    setNewSource({ name: '', type: '', config: '', frequency: '' });
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleEdit = (source) => {
    setNewSource(source);
    setEditingId(source.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDataSources(prev => prev.filter(source => source.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Configuration</TableHead>
              <TableHead>Update Frequency</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSources.map((source) => (
              <TableRow key={source.id}>
                <TableCell>{source.name}</TableCell>
                <TableCell>{source.type}</TableCell>
                <TableCell>{source.config}</TableCell>
                <TableCell>{source.frequency}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(source)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(source.id)}>
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
              Add New Data Source
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Data Source' : 'Add New Data Source'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={newSource.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select name="type" value={newSource.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Worker">Worker</SelectItem>
                    <SelectItem value="KV">KV Store</SelectItem>
                    <SelectItem value="External API">External API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="config">Configuration</Label>
                <Input id="config" name="config" value={newSource.config} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="frequency">Update Frequency</Label>
                <Input id="frequency" name="frequency" value={newSource.frequency} onChange={handleInputChange} required />
              </div>
              <Button type="submit">{editingId ? 'Update' : 'Add'} Data Source</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DataSources;