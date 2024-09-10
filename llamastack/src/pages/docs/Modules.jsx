import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Modules = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Modules and Dependencies</h1>
      <Card>
        <CardHeader>
          <CardTitle>Managing LlamaStack Dependencies</CardTitle>
          <CardDescription>Key modules and dependency management in LlamaStack</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Core Dependencies</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>React: UI library</li>
            <li>Vite: Build tool and development server</li>
            <li>Supabase: Backend and database service</li>
            <li>OpenAI: AI integration for code analysis</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Dependency Management</h2>
          <p>Use npm to manage dependencies:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Install: <code>npm install [package-name]</code></li>
            <li>Update: <code>npm update [package-name]</code></li>
            <li>Remove: <code>npm uninstall [package-name]</code></li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Optimizing Imports</h2>
          <p>To reduce bundle size:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use ES6 import syntax for tree-shaking</li>
            <li>Implement dynamic imports for code-splitting</li>
            <li>Avoid importing entire libraries when possible</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Version Control</h2>
          <p>Use package-lock.json to ensure consistent installations across environments. Commit this file to version control.</p>
          <h2 className="text-xl font-semibold mt-4">Updating Dependencies</h2>
          <p>Regularly update dependencies to get the latest features and security patches. Use <code>npm outdated</code> to check for updates.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Modules;