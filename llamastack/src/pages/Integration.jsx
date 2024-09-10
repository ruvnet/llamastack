import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiConnectorLibrary from '@/components/integration/ApiConnectorLibrary';
import WebhookManagement from '@/components/integration/WebhookManagement';
import ThirdPartyIntegrations from '@/components/integration/ThirdPartyIntegrations';
import OAuthFlowAutomation from '@/components/integration/OAuthFlowAutomation';
import ApiUsageAnalytics from '@/components/integration/ApiUsageAnalytics';
import CustomConnectorBuilder from '@/components/integration/CustomConnectorBuilder';
import IntegrationMarketplace from '@/components/integration/IntegrationMarketplace';

const Integration = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Integration Hub</h1>
      <Tabs defaultValue="api-connectors">
        <TabsList className="mb-4">
          <TabsTrigger value="api-connectors">API Connectors</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="third-party">Third-party Services</TabsTrigger>
          <TabsTrigger value="oauth">OAuth Flow</TabsTrigger>
          <TabsTrigger value="analytics">API Analytics</TabsTrigger>
          <TabsTrigger value="custom-builder">Custom Connector</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        <TabsContent value="api-connectors">
          <ApiConnectorLibrary />
        </TabsContent>
        <TabsContent value="webhooks">
          <WebhookManagement />
        </TabsContent>
        <TabsContent value="third-party">
          <ThirdPartyIntegrations />
        </TabsContent>
        <TabsContent value="oauth">
          <OAuthFlowAutomation />
        </TabsContent>
        <TabsContent value="analytics">
          <ApiUsageAnalytics />
        </TabsContent>
        <TabsContent value="custom-builder">
          <CustomConnectorBuilder />
        </TabsContent>
        <TabsContent value="marketplace">
          <IntegrationMarketplace />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integration;