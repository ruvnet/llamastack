import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MfaSetup = () => {
  const [mfaMethod, setMfaMethod] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleEnableMfa = () => {
    console.log('Enabling MFA with method:', mfaMethod);
    // Implement MFA setup logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-Factor Authentication Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="mfaMethod">Select MFA Method</Label>
            <Select value={mfaMethod} onValueChange={setMfaMethod}>
              <SelectTrigger id="mfaMethod">
                <SelectValue placeholder="Choose MFA method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="authenticator">Authenticator App</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {mfaMethod && (
            <>
              <div>
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                />
              </div>
              <Button onClick={handleEnableMfa}>Enable MFA</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MfaSetup;