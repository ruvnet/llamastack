import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const IpWhitelisting = () => {
  const [ipAddresses, setIpAddresses] = useState([
    { id: 1, address: '192.168.1.1', description: 'Office IP' },
    { id: 2, address: '10.0.0.1', description: 'VPN Server' },
  ]);

  const [newIp, setNewIp] = useState({ address: '', description: '' });

  const handleAddIp = () => {
    if (newIp.address && newIp.description) {
      setIpAddresses([...ipAddresses, { ...newIp, id: ipAddresses.length + 1 }]);
      setNewIp({ address: '', description: '' });
    }
  };

  const handleRemoveIp = (id) => {
    setIpAddresses(ipAddresses.filter(ip => ip.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>IP Whitelisting</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ipAddresses.map((ip) => (
              <TableRow key={ip.id}>
                <TableCell>{ip.address}</TableCell>
                <TableCell>{ip.description}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveIp(ip.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="ipAddress">IP Address</Label>
            <Input
              id="ipAddress"
              value={newIp.address}
              onChange={(e) => setNewIp({ ...newIp, address: e.target.value })}
              placeholder="Enter IP address"
            />
          </div>
          <div>
            <Label htmlFor="ipDescription">Description</Label>
            <Input
              id="ipDescription"
              value={newIp.description}
              onChange={(e) => setNewIp({ ...newIp, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>
          <Button onClick={handleAddIp}>Add IP to Whitelist</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IpWhitelisting;