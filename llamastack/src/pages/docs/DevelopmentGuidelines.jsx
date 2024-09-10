import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DevelopmentGuidelines = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Development Guidelines</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coding Standards</CardTitle>
          <CardDescription>Best practices for LlamaStack development</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Project Setup</h2>
          <p>LlamaStack uses Vite.js for fast development and optimized builds. Ensure you have Node.js and npm installed before setting up the project.</p>
          <h2 className="text-xl font-semibold mt-4">Coding Style</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>Use ESLint and Prettier for consistent code formatting</li>
            <li>Follow React best practices and hooks guidelines</li>
            <li>Write meaningful component and function names</li>
            <li>Use TypeScript for type safety when possible</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Module Structure</h2>
          <p>Organize your code into logical modules and components. Use index.js files for cleaner imports.</p>
          <h2 className="text-xl font-semibold mt-4">OpenAI Integration</h2>
          <p>When working with OpenAI:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use environment variables for API keys</li>
            <li>Implement proper error handling for API calls</li>
            <li>Optimize prompts for better AI responses</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Performance Considerations</h2>
          <p>Always consider performance when developing new features. Use React.memo for pure components and useMemo/useCallback hooks when appropriate.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentGuidelines;