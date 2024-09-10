import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SecurityPolicyConfig = () => {
  const [policies, setPolicies] = useState({
    passwordMinLength: 12,
    passwordExpiration: 90,
    sessionTimeout: 30,
    mfaRequired: true,
    ipWhitelistingEnabled: false,
  });

  const handlePolicyChange = (key, value) => {
    setPolicies({ ...policies, [key]: value });
  };

  const handleSavePolicies = () => {
    console.log('Saving policies:', policies);
    // Implement API call to save policies
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Policy Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
            <Input
              id="passwordMinLength"
              type="number"
              value={policies.passwordMinLength}
              onChange={(e) => handlePolicyChange('passwordMinLength', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="passwordExpiration">Password Expiration (days)</Label>
            <Input
              id="passwordExpiration"
              type="number"
              value={policies.passwordExpiration}
              onChange={(e) => handlePolicyChange('passwordExpiration', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={policies.sessionTimeout}
              onChange={(e) => handlePolicyChange('sessionTimeout', parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="mfaRequired"
              checked={policies.mfaRequired}
              onCheckedChange={(checked) => handlePolicyChange('mfaRequired', checked)}
            />
            <Label htmlFor="mfaRequired">Require Multi-Factor Authentication</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="ipWhitelistingEnabled"
              checked={policies.ipWhitelistingEnabled}
              onCheckedChange={(checked) => handlePolicyChange('ipWhitelistingEnabled', checked)}
            />
            <Label htmlFor="ipWhitelistingEnabled">Enable IP Whitelisting</Label>
          </div>
          <Button onClick={handleSavePolicies}>Save Policies</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityPolicyConfig;