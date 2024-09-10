import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from 'lucide-react';

const OutputDestinations = () => {
  const [destinations, setDestinations] = useState([
    { id: 1, name: 'User Analytics KV', type: 'KV', config: 'user-analytics-namespace', format: 'JSON' },
    { id: 2, name: 'Log Archive R2', type: 'R2', config: 'logs-archive-bucket', format: 'CSV' },
  ]);

  const [newDestination, setNewDestination] = useState({ name: '', type: '', config: '', format: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDestination(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewDestination(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDestinations(prev => prev.map(dest => dest.id === editingId ? { ...newDestination, id: editingId } : dest));
    } else {
      setDestinations(prev => [...prev, { ...newDestination, id: Date.now() }]);
    }
    setNewDestination({ name: '', type: '', config: '', format: '' });
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleEdit = (destination) => {
    setNewDestination(destination);
    setEditingId(destination.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDestinations(prev => prev.filter(dest => dest.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Output Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Configuration</TableHead>
              <TableHead>Output Format</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinations.map((destination) => (
              <TableRow key={destination.id}>
                <TableCell>{destination.name}</TableCell>
                <TableCell>{destination.type}</TableCell>
                <TableCell>{destination.config}</TableCell>
                <TableCell>{destination.format}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(destination)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(destination.id)}>
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
              Add New Destination
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Destination' : 'Add New Destination'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={newDestination.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select name="type" value={newDestination.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KV">KV</SelectItem>
                    <SelectItem value="R2">R2</SelectItem>
                    <SelectItem value="External Storage">External Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="config">Configuration</Label>
                <Input id="config" name="config" value={newDestination.config} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="format">Output Format</Label>
                <Select name="format" value={newDestination.format} onValueChange={(value) => handleSelectChange('format', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JSON">JSON</SelectItem>
                    <SelectItem value="CSV">CSV</SelectItem>
                    <SelectItem value="XML">XML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">{editingId ? 'Update' : 'Add'} Destination</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default OutputDestinations;