import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const SsoIntegration = () => {
  const [ssoProvider, setSsoProvider] = useState('');
  const [ssoConfig, setSsoConfig] = useState({
    clientId: '',
    clientSecret: '',
    ssoUrl: '',
    enabled: false,
  });

  const handleConfigChange = (key, value) => {
    setSsoConfig({ ...ssoConfig, [key]: value });
  };

  const handleSaveSsoConfig = () => {
    console.log('Saving SSO configuration:', { provider: ssoProvider, config: ssoConfig });
    // Implement API call to save SSO configuration
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Single Sign-On Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ssoProvider">SSO Provider</Label>
            <Select value={ssoProvider} onValueChange={setSsoProvider}>
              <SelectTrigger id="ssoProvider">
                <SelectValue placeholder="Select SSO provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="okta">Okta</SelectItem>
                <SelectItem value="google">Google Workspace</SelectItem>
                <SelectItem value="azure">Azure AD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {ssoProvider && (
            <>
              <div>
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  value={ssoConfig.clientId}
                  onChange={(e) => handleConfigChange('clientId', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  type="password"
                  value={ssoConfig.clientSecret}
                  onChange={(e) => handleConfigChange('clientSecret', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="ssoUrl">SSO URL</Label>
                <Input
                  id="ssoUrl"
                  value={ssoConfig.ssoUrl}
                  onChange={(e) => handleConfigChange('ssoUrl', e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="ssoEnabled"
                  checked={ssoConfig.enabled}
                  onCheckedChange={(checked) => handleConfigChange('enabled', checked)}
                />
                <Label htmlFor="ssoEnabled">Enable SSO</Label>
              </div>
              <Button onClick={handleSaveSsoConfig}>Save SSO Configuration</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SsoIntegration;