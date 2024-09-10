import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Security = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Security Best Practices</h1>
      <Card>
        <CardHeader>
          <CardTitle>Securing Your LlamaStack Application</CardTitle>
          <CardDescription>Essential security measures for LlamaStack</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Environment Variables</h2>
          <p>Always use .env files to store sensitive information like API keys. Never commit these files to version control.</p>
          <h2 className="text-xl font-semibold mt-4">Data Protection</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>Implement proper authentication and authorization</li>
            <li>Use HTTPS for all communications</li>
            <li>Sanitize user inputs to prevent XSS attacks</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Dependency Management</h2>
          <p>Regularly update dependencies and run npm audit to check for vulnerabilities. Consider using tools like Snyk for continuous security monitoring.</p>
          <h2 className="text-xl font-semibold mt-4">API Security</h2>
          <p>When working with OpenAI and Supabase APIs:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Implement rate limiting to prevent abuse</li>
            <li>Use API keys with minimal necessary permissions</li>
            <li>Validate and sanitize all API inputs and outputs</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Production Security</h2>
          <p>In production environments:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Enable security headers (e.g., CSP, HSTS)</li>
            <li>Implement proper error handling to avoid information leakage</li>
            <li>Regularly backup and encrypt sensitive data</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;