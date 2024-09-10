import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Database = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Database Setup & Usage</h1>
      <Card>
        <CardHeader>
          <CardTitle>Supabase Database Configuration</CardTitle>
          <CardDescription>Setting up and using Supabase with LlamaStack</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Supabase Setup</h2>
          <ol className="list-decimal pl-5 mt-2">
            <li>Create a Supabase account and project</li>
            <li>Copy your Supabase URL and API key</li>
            <li>Add these credentials to your .env file</li>
          </ol>
          <h2 className="text-xl font-semibold mt-4">Database Schema</h2>
          <p>LlamaStack uses the following main tables:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>users: Stores user information</li>
            <li>projects: Contains project details</li>
            <li>challenges: Stores coding challenges</li>
            <li>submissions: Records user challenge submissions</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Migrations</h2>
          <p>To update your database schema:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>Create a new migration file in the migrations folder</li>
            <li>Run migrations using Supabase CLI or dashboard</li>
          </ol>
          <h2 className="text-xl font-semibold mt-4">Querying Data</h2>
          <p>Use Supabase client in your React components to query data:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)`}
          </pre>
          <h2 className="text-xl font-semibold mt-4">Data Security</h2>
          <p>Implement Row Level Security (RLS) policies in Supabase to secure your data at the database level.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Database;