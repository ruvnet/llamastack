import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play, Edit, Trash2 } from 'lucide-react';

const Cron = () => {
  const [cronJobs, setCronJobs] = useState([
    { id: 1, name: 'Daily Backup', worker: 'BackupWorker', expression: '0 0 * * *', status: 'Active', lastRun: '2023-03-15 00:00:00', nextRun: '2023-03-16 00:00:00' },
    { id: 2, name: 'Hourly Report', worker: 'ReportWorker', expression: '0 * * * *', status: 'Active', lastRun: '2023-03-15 15:00:00', nextRun: '2023-03-15 16:00:00' },
    { id: 3, name: 'Weekly Cleanup', worker: 'CleanupWorker', expression: '0 0 * * 0', status: 'Inactive', lastRun: '2023-03-12 00:00:00', nextRun: '2023-03-19 00:00:00' },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);

  const handleEditJob = (job) => {
    setSelectedJob(job);
  };

  const handleDeleteJob = (jobId) => {
    setCronJobs(cronJobs.filter(job => job.id !== jobId));
  };

  const handleRunNow = (jobId) => {
    alert(`Running job ${jobId} now`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cron Scheduler</h1>
      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Cron Jobs List</TabsTrigger>
          <TabsTrigger value="create">Create/Edit Cron Job</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Cron Jobs List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Worker</TableHead>
                    <TableHead>Cron Expression</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cronJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.name}</TableCell>
                      <TableCell>{job.worker}</TableCell>
                      <TableCell>{job.expression}</TableCell>
                      <TableCell>{job.status}</TableCell>
                      <TableCell>{job.lastRun}</TableCell>
                      <TableCell>{job.nextRun}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEditJob(job)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="mr-2" onClick={() => handleDeleteJob(job.id)}>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>{selectedJob ? 'Edit Cron Job' : 'Create Cron Job'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="jobName">Job Name</Label>
                  <Input id="jobName" placeholder="Enter job name" defaultValue={selectedJob?.name} />
                </div>
                <div>
                  <Label htmlFor="worker">Associated Worker</Label>
                  <Select defaultValue={selectedJob?.worker}>
                    <SelectTrigger id="worker">
                      <SelectValue placeholder="Select worker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BackupWorker">BackupWorker</SelectItem>
                      <SelectItem value="ReportWorker">ReportWorker</SelectItem>
                      <SelectItem value="CleanupWorker">CleanupWorker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cronExpression">Cron Expression</Label>
                  <Input id="cronExpression" placeholder="Enter cron expression" defaultValue={selectedJob?.expression} />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="UTC">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="retryPolicy">Retry Policy</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="retryPolicy">
                      <SelectValue placeholder="Select retry policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="linear">Linear</SelectItem>
                      <SelectItem value="exponential">Exponential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeout">Timeout (seconds)</Label>
                  <Input id="timeout" type="number" placeholder="Enter timeout in seconds" defaultValue="30" />
                </div>
                <Button type="submit">{selectedJob ? 'Update Cron Job' : 'Create Cron Job'}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Name</TableHead>
                    <TableHead>Execution Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Daily Backup</TableCell>
                    <TableCell>2023-03-15 00:00:00</TableCell>
                    <TableCell>Success</TableCell>
                    <TableCell>2m 30s</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Logs</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Execution Logs</DialogTitle>
                          </DialogHeader>
                          <Textarea readOnly className="h-[200px]" value="Log output will be displayed here..." />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hourly Report</TableCell>
                    <TableCell>2023-03-15 15:00:00</TableCell>
                    <TableCell>Failure</TableCell>
                    <TableCell>0m 5s</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Logs</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Execution Logs</DialogTitle>
                          </DialogHeader>
                          <Textarea readOnly className="h-[200px]" value="Error: Connection timeout..." />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Cron;