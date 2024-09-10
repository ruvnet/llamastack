import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IntegrationMarketplace = () => {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Slack Notifier', author: 'CloudflareUser1', rating: 4.5, downloads: 1000 },
    { id: 2, name: 'GitHub Issue Tracker', author: 'DevOps Team', rating: 4.2, downloads: 750 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddIntegration = (newIntegration) => {
    setIntegrations([...integrations, { id: integrations.length + 1, ...newIntegration, rating: 0, downloads: 0 }]);
  };

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Marketplace</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Publish Integration</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publish New Integration</DialogTitle>
              </DialogHeader>
              <PublishIntegrationForm onPublish={handleAddIntegration} />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIntegrations.map((integration) => (
              <TableRow key={integration.id}>
                <TableCell>{integration.name}</TableCell>
                <TableCell>{integration.author}</TableCell>
                <TableCell>{integration.rating.toFixed(1)}</TableCell>
                <TableCell>{integration.downloads}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Install</Button>
                  <Button variant="outline" size="sm">Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    
    </Card>
  );
};

const PublishIntegrationForm = ({ onPublish }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPublish({ name, author: 'Current User', description, category });
    setName('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Integration Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="communication">Communication</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
            <SelectItem value="developer-tools">Developer Tools</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Publish Integration</Button>
    </form>
  );
};

export default IntegrationMarketplace;