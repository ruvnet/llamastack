import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Changelog = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Changelog</h1>
      <Card>
        <CardHeader>
          <CardTitle>LlamaStack Version History</CardTitle>
          <CardDescription>A record of all notable changes to LlamaStack</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Version 1.0.0 (Latest)</h2>
          <p className="text-sm text-gray-500">Released on 2023-06-01</p>
          <h3 className="font-semibold mt-2">New Features:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>Implemented AI-powered code review system</li>
            <li>Added real-time collaboration features</li>
            <li>Introduced dynamic leaderboards</li>
          </ul>
          <h3 className="font-semibold mt-2">Bug Fixes:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>Fixed issue with user authentication flow</li>
            <li>Resolved performance bottleneck in data fetching</li>
          </ul>
          <h3 className="font-semibold mt-2">Security Updates:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>Updated dependencies to address potential vulnerabilities</li>
            <li>Enhanced encryption for sensitive user data</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Version 0.9.0</h2>
          <p className="text-sm text-gray-500">Released on 2023-05-15</p>
          <h3 className="font-semibold mt-2">New Features:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>Beta release of AI code analysis</li>
            <li>Implemented basic user profiles</li>
          </ul>
          <h3 className="font-semibold mt-2">Improvements:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>Enhanced UI/UX for main dashboard</li>
            <li>Optimized database queries for faster performance</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Version 0.8.0</h2>
          <p className="text-sm text-gray-500">Released on 2023-05-01</p>
          <h3 className="font-semibold mt-2">New Features:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>Introduced basic project management features</li>
            <li>Added support for multiple programming languages</li>
          </ul>
          <h3 className="font-semibold mt-2">Bug Fixes:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>Resolved issues with user registration process</li>
            <li>Fixed layout problems on mobile devices</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Changelog;