import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const API = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">API Integration Documentation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Integrating with LlamaStack API</CardTitle>
          <CardDescription>Guidelines for working with LlamaStack FastAPI endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">LlamaStack API Overview</h2>
          <p>The LlamaStack API is implemented using FastAPI and provides various endpoints for chat moderation, custom tools, and agentic system operations.</p>
          
          <h2 className="text-xl font-semibold mt-4">FastAPI Implementation</h2>
          <p>The FastAPI implementation is located in the <code>fastapi/app.py</code> file at the root of the project.</p>
          
          <h3 className="text-lg font-semibold mt-2">Running the FastAPI Server</h3>
          <ol className="list-decimal pl-5 mt-2">
            <li>Ensure you have Python installed (3.7+)</li>
            <li>Install required dependencies:
              <pre className="bg-gray-100 p-2 rounded mt-2">
                pip install fastapi uvicorn pydantic
              </pre>
            </li>
            <li>Navigate to the fastapi directory:
              <pre className="bg-gray-100 p-2 rounded mt-2">
                cd fastapi
              </pre>
            </li>
            <li>Run the FastAPI server:
              <pre className="bg-gray-100 p-2 rounded mt-2">
                python app.py
              </pre>
            </li>
            <li>The server will start on <code>http://0.0.0.0:8000</code> with a keep-alive timeout of 120 seconds</li>
          </ol>
          
          <h2 className="text-xl font-semibold mt-4">Key Endpoints</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>GET /: Chat moderation with Llama Guard</li>
            <li>GET /custom-tools: Chat with custom tools</li>
            <li>GET /main: Main chat interface</li>
            <li>POST /inference/batch_chat_completion: Batch chat completion</li>
            <li>POST /inference/chat_completion: Single chat completion</li>
            <li>POST /safety/run_shields: Run safety shields</li>
            <li>POST /agentic_system/create: Create agentic system</li>
            <li>POST /agentic_system/session/create: Create session</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Using the API</h2>
          <p>To use the LlamaStack API in your project:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>Ensure the FastAPI server is running</li>
            <li>Use the createLlamaStackApi function to initialize the API client</li>
            <li>Call the appropriate method for each endpoint</li>
          </ol>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`import createLlamaStackApi from '../services/llamaStackApi';

const api = await createLlamaStackApi();
const response = await api.chatModeration({
  inference_port: 8000,
  host: 'localhost',
  custom_tools: [],
  disable_safety: false
});`}
          </pre>
          
          <h2 className="text-xl font-semibold mt-4">Error Handling</h2>
          <p>Implement robust error handling for API calls:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use try-catch blocks for async operations</li>
            <li>Handle specific error codes returned by the API</li>
            <li>Implement retry logic for transient errors</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">API Request Examples</h2>
          <h3 className="text-lg font-semibold mt-2">Chat Moderation</h3>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`const response = await api.chatModeration({
  inference_port: 8000,
  host: 'localhost',
  custom_tools: [],
  disable_safety: false
});`}
          </pre>
          
          <h3 className="text-lg font-semibold mt-2">Create Agentic System</h3>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`const response = await api.agenticSystemCreate({
  config: {
    name: 'My Agentic System',
    description: 'A custom agentic system'
  }
});`}
          </pre>
          
          <h2 className="text-xl font-semibold mt-4">Performance Considerations</h2>
          <p>Optimize API usage:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use batch operations when possible (e.g., batch_chat_completion)</li>
            <li>Implement caching for frequently accessed data</li>
            <li>Monitor API usage to stay within rate limits</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Security Best Practices</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>Store API keys securely using environment variables</li>
            <li>Use HTTPS for all API communications in production</li>
            <li>Implement proper authentication and authorization in your application</li>
            <li>Regularly rotate API keys and monitor for suspicious activity</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">API Documentation</h2>
          <p>For detailed API documentation, visit <code>http://localhost:8000/docs</code> after starting the FastAPI server. This interactive documentation provides a comprehensive overview of all available endpoints, request/response models, and allows you to test the API directly from your browser.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default API;