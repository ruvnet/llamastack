import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from 'lucide-react';

const AggregationRules = () => {
  const [rules, setRules] = useState([
    { id: 1, name: 'Daily User Count', source: 'User Logins', operation: 'Count', groupBy: 'Date', output: 'JSON' },
    { id: 2, name: 'Average Response Time', source: 'API Requests', operation: 'Average', groupBy: 'Endpoint', output: 'CSV' },
  ]);

  const [newRule, setNewRule] = useState({ name: '', source: '', operation: '', groupBy: '', output: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRule(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewRule(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setRules(prev => prev.map(rule => rule.id === editingId ? { ...newRule, id: editingId } : rule));
    } else {
      setRules(prev => [...prev, { ...newRule, id: Date.now() }]);
    }
    setNewRule({ name: '', source: '', operation: '', groupBy: '', output: '' });
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleEdit = (rule) => {
    setNewRule(rule);
    setEditingId(rule.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aggregation Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Source Data</TableHead>
              <TableHead>Operation</TableHead>
              <TableHead>Group By</TableHead>
              <TableHead>Output Format</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>{rule.name}</TableCell>
                <TableCell>{rule.source}</TableCell>
                <TableCell>{rule.operation}</TableCell>
                <TableCell>{rule.groupBy}</TableCell>
                <TableCell>{rule.output}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(rule)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(rule.id)}>
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
              Add New Aggregation Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Aggregation Rule' : 'Add New Aggregation Rule'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={newRule.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="source">Source Data</Label>
                <Input id="source" name="source" value={newRule.source} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="operation">Operation</Label>
                <Select name="operation" value={newRule.operation} onValueChange={(value) => handleSelectChange('operation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Count">Count</SelectItem>
                    <SelectItem value="Sum">Sum</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Min">Min</SelectItem>
                    <SelectItem value="Max">Max</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="groupBy">Group By</Label>
                <Input id="groupBy" name="groupBy" value={newRule.groupBy} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="output">Output Format</Label>
                <Select name="output" value={newRule.output} onValueChange={(value) => handleSelectChange('output', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JSON">JSON</SelectItem>
                    <SelectItem value="CSV">CSV</SelectItem>
                    <SelectItem value="XML">XML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">{editingId ? 'Update' : 'Add'} Aggregation Rule</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AggregationRules;