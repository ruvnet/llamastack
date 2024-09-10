import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Deployment = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Deployment Guide</h1>
      <Card>
        <CardHeader>
          <CardTitle>Deploying Your LlamaStack Application</CardTitle>
          <CardDescription>Steps to deploy LlamaStack to production</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Local Development</h2>
          <p>To run LlamaStack locally:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>Clone the repository</li>
            <li>Run <code>npm install</code> to install dependencies</li>
            <li>Set up your .env file with necessary API keys</li>
            <li>Run <code>npm run dev</code> to start the development server</li>
          </ol>
          <h2 className="text-xl font-semibold mt-4">Production Build</h2>
          <p>To create a production build:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>Run <code>npm run build</code> to create an optimized build</li>
            <li>Test the build locally with <code>npm run preview</code></li>
          </ol>
          <h2 className="text-xl font-semibold mt-4">Deployment Options</h2>
          <p>LlamaStack can be deployed to various platforms:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Vercel: Automatic deployments with GitHub integration</li>
            <li>Netlify: Easy deployment with continuous integration</li>
            <li>AWS: Use S3 for static hosting and Lambda for serverless functions</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Environment Variables</h2>
          <p>Ensure all necessary environment variables are set in your production environment, including API keys for OpenAI and Supabase.</p>
          <h2 className="text-xl font-semibold mt-4">Post-Deployment</h2>
          <p>After deploying:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Verify all features are working correctly</li>
            <li>Set up monitoring and error tracking (e.g., Sentry)</li>
            <li>Configure analytics to track user engagement</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deployment;