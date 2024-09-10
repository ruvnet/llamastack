import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Environment = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Environment Setup Documentation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Setting Up Your LlamaStack Environment</CardTitle>
          <CardDescription>Guide to configuring your development environment</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Local Environment Setup</h2>
          <ol className="list-decimal pl-5 mt-2">
            <li>Install Node.js (v14 or later) and npm</li>
            <li>Clone the LlamaStack repository</li>
            <li>Run <code>npm install</code> to install dependencies</li>
            <li>Copy <code>.env.example</code> to <code>.env</code> and fill in required values</li>
          </ol>
          
          <h2 className="text-xl font-semibold mt-4">Environment Variables</h2>
          <p>Key environment variables:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>VITE_SUPABASE_URL: Your Supabase project URL</li>
            <li>VITE_SUPABASE_ANON_KEY: Supabase anonymous key</li>
            <li>VITE_OPENAI_API_KEY: Your OpenAI API key</li>
          </ul>
          <p className="mt-2">Use a tool like 1Password for secure storage of sensitive variables.</p>
          
          <h2 className="text-xl font-semibold mt-4">Development vs Production</h2>
          <p>Differentiating environments:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use <code>.env.development</code> and <code>.env.production</code> for environment-specific variables</li>
            <li>Set NODE_ENV to 'development' or 'production' accordingly</li>
            <li>Use different API keys and database instances for each environment</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Version Control</h2>
          <p>Environment file management:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Add <code>.env</code> to your <code>.gitignore</code> file</li>
            <li>Include a <code>.env.example</code> in your repository with placeholder values</li>
            <li>Document the required environment variables in your README</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Running the Application</h2>
          <p>To start the development server:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            npm run dev
          </pre>
          <p className="mt-2">This will start the Vite development server with hot module replacement.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Environment;