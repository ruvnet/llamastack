import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Readme = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">LlamaStack Documentation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>LlamaStack: A powerful AI-driven development platform</CardDescription>
        </CardHeader>
        <CardContent>
          <p>LlamaStack is a cutting-edge platform that leverages AI technologies to enhance the software development process. Built with React, Vite, and integrated with Supabase and OpenAI, LlamaStack offers a suite of tools for efficient coding, collaboration, and learning.</p>
          <h2 className="text-xl font-semibold mt-4">Key Features</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>AI-powered code analysis and suggestions</li>
            <li>Real-time collaboration tools</li>
            <li>Dynamic leaderboards and skill assessments</li>
            <li>Integrated development environment</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Getting Started</h2>
          <p>To get started with LlamaStack, follow these steps:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>Clone the repository</li>
            <li>Install dependencies with <code>npm install</code></li>
            <li>Set up environment variables (see Environment Setup)</li>
            <li>Run the development server with <code>npm run dev</code></li>
          </ol>
          <p className="mt-4">For more detailed information, please refer to the specific documentation sections in the navigation menu.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Readme;