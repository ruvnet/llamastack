import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WelcomeMessage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="text-3xl font-bold">Welcome to LlamaStack</span>
          <span className="ml-2 text-2xl font-normal" style={{ fontFamily: 'Mr Dafoe, cursive' }}>by rUv</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          LlamaStack is a cutting-edge AI platform developed by Meta, offering a comprehensive ecosystem for building and deploying sophisticated AI applications using Llama 3.1 models. It features advanced language models available in 8B, 70B, and 405B parameter versions, supporting multiple languages and boasting a 128K token context length.
        </p>
        <p className="mt-2">
          The platform includes a standardized API, safety mechanisms like Llama Guard 3 and Prompt Guard, and powerful agentic capabilities for multi-step reasoning and autonomous decision-making.
        </p>
        <p className="mt-2">
          With support for customization, tool use, and zero-shot learning, LlamaStack enables developers to create a wide range of applications, from intelligent chatbots and workflow assistants to coding aids and database interaction tools. By providing open-source implementations and encouraging community engagement, Meta aims to foster innovation while promoting responsible AI development.
        </p>
        <p className="mt-2">
          Llama Stack UI created by <span style={{ fontFamily: 'Mr Dafoe, cursive' }}>rUv</span>.
        </p>
      </CardContent>
    </Card>
  );
};

export default WelcomeMessage;