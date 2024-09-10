import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserRoleManagement from '@/components/security/UserRoleManagement';
import ApiKeyManagement from '@/components/security/ApiKeyManagement';
import AuditLogs from '@/components/security/AuditLogs';
import SecurityPolicyConfig from '@/components/security/SecurityPolicyConfig';
import MfaSetup from '@/components/security/MfaSetup';
import SsoIntegration from '@/components/security/SsoIntegration';
import IpWhitelisting from '@/components/security/IpWhitelisting';

const Security = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Security & Access Control</h1>
      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="policies">Security Policies</TabsTrigger>
          <TabsTrigger value="mfa">MFA</TabsTrigger>
          <TabsTrigger value="sso">SSO</TabsTrigger>
          <TabsTrigger value="ip-whitelist">IP Whitelist</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserRoleManagement />
        </TabsContent>
        <TabsContent value="api-keys">
          <ApiKeyManagement />
        </TabsContent>
        <TabsContent value="audit-logs">
          <AuditLogs />
        </TabsContent>
        <TabsContent value="policies">
          <SecurityPolicyConfig />
        </TabsContent>
        <TabsContent value="mfa">
          <MfaSetup />
        </TabsContent>
        <TabsContent value="sso">
          <SsoIntegration />
        </TabsContent>
        <TabsContent value="ip-whitelist">
          <IpWhitelisting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Security;