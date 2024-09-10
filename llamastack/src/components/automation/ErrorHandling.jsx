import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const ErrorHandling = () => {
  const [retryPolicy, setRetryPolicy] = useState('');
  const [maxRetries, setMaxRetries] = useState('3');
  const [notifyOnError, setNotifyOnError] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');

  const saveErrorHandlingConfig = () => {
    console.log('Saving error handling configuration:', {
      retryPolicy,
      maxRetries,
      notifyOnError,
      notificationEmail
    });
    // Implement actual save logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Handling Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="retryPolicy">Retry Policy</Label>
            <Select onValueChange={setRetryPolicy} value={retryPolicy}>
              <SelectTrigger id="retryPolicy">
                <SelectValue placeholder="Select retry policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="exponentialBackoff">Exponential Backoff</SelectItem>
                <SelectItem value="fixedInterval">Fixed Interval</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="maxRetries">Max Retries</Label>
            <Input
              id="maxRetries"
              type="number"
              value={maxRetries}
              onChange={(e) => setMaxRetries(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="notifyOnError"
              checked={notifyOnError}
              onCheckedChange={setNotifyOnError}
            />
            <Label htmlFor="notifyOnError">Notify on Error</Label>
          </div>

          {notifyOnError && (
            <div>
              <Label htmlFor="notificationEmail">Notification Email</Label>
              <Input
                id="notificationEmail"
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          )}

          <Button onClick={saveErrorHandlingConfig}>Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorHandling;