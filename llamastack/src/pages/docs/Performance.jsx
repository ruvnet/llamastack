import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Performance = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bol

d mb-4">Performance Optimization Guide</h1>
      <Card>
        <CardHeader>
          <CardTitle>Optimizing LlamaStack Performance</CardTitle>
          <CardDescription>Strategies to enhance the speed and efficiency of your LlamaStack application</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Code Splitting</h2>
          <p>Implement code splitting to reduce initial load time:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use dynamic imports for route-based code splitting</li>
            <li>Leverage React.lazy and Suspense for component-level splitting</li>
          </ul>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`import React, { lazy, Suspense } from 'react';
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}`}
          </pre>
          
          <h2 className="text-xl font-semibold mt-4">Bundle Optimization</h2>
          <p>Reduce bundle size:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use tree shaking to eliminate dead code</li>
            <li>Optimize dependencies with tools like webpack-bundle-analyzer</li>
            <li>Implement dynamic imports for large libraries</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Asset Optimization</h2>
          <p>Optimize assets for faster loading:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use WebP format for images where possible</li>
            <li>Implement lazy loading for images and videos</li>
            <li>Minify CSS and JavaScript files</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Caching Strategies</h2>
          <p>Implement effective caching:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use service workers for offline caching</li>
            <li>Implement browser caching with appropriate cache headers</li>
            <li>Use memory caching for frequently accessed data</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">API Optimization</h2>
          <p>Optimize API calls:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Implement pagination for large data sets</li>
            <li>Use GraphQL for more efficient data fetching</li>
            <li>Implement debouncing and throttling for user inputs</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Monitoring and Analysis</h2>
          <p>Continuously monitor performance:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use tools like Lighthouse for performance audits</li>
            <li>Implement real user monitoring (RUM) for production insights</li>
            <li>Regularly profile your application to identify bottlenecks</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Performance;