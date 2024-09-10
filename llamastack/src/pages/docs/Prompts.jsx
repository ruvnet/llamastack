import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Prompts = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Prompt Engineering Documentation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Creating Effective AI Prompts</CardTitle>
          <CardDescription>Guidelines for optimizing OpenAI prompts in LlamaStack</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Creating Prompts</h2>
          <p>When creating prompts for OpenAI:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Be specific and clear in your instructions</li>
            <li>Provide context and examples when necessary</li>
            <li>Use consistent formatting for similar types of prompts</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Optimizing Prompts</h2>
          <p>To get better responses:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Experiment with different phrasings</li>
            <li>Adjust temperature and max tokens settings</li>
            <li>Use few-shot learning by providing examples</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Common Errors</h2>
          <p>Handle these common issues:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Rate limiting: Implement proper retries and backoff</li>
            <li>Incomplete responses: Check and handle truncated output</li>
            <li>API errors: Implement robust error handling</li>
          </ul>
          <h2 className="text-xl font-semibold mt-4">Example Prompt</h2>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`You are an AI code reviewer. Analyze the following code and provide feedback on its functionality, efficiency, and style:

[CODE]
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
[/CODE]

Please provide your analysis in the following format:
1. Functionality:
2. Efficiency:
3. Style:
4. Suggestions for improvement:`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prompts;