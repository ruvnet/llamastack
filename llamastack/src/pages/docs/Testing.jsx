import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Testing = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Testing Guide</h1>
      <Card>
        <CardHeader>
          <CardTitle>Testing Strategies for LlamaStack</CardTitle>
          <CardDescription>Comprehensive guide to testing your LlamaStack application</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold">Unit Testing</h2>
          <p>We use Vitest for unit testing:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Write tests in files with <code>.test.js</code> or <code>.spec.js</code> extensions</li>
            <li>Focus on testing individual components and functions</li>
            <li>Use mocks for external dependencies and API calls</li>
          </ul>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

test('MyComponent renders correctly', () => {
  render(<MyComponent />)
  expect(screen.getByText('Hello, World!')).toBeDefined()
})`}
          </pre>
          
          <h2 className="text-xl font-semibold mt-4">Integration Testing</h2>
          <p>For testing interactions between components:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Test API integrations with OpenAI and Supabase</li>
            <li>Use mock servers to simulate API responses</li>
            <li>Test data flow between components</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">End-to-End Testing</h2>
          <p>We use Cypress for e2e tests:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Write tests in the <code>cypress/e2e</code> directory</li>
            <li>Simulate real user interactions</li>
            <li>Test critical user flows and edge cases</li>
          </ul>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`describe('Login Flow', () => {
  it('should log in successfully', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})`}
          </pre>
          
          <h2 className="text-xl font-semibold mt-4">Automated Testing</h2>
          <p>Set up CI/CD pipelines to run tests automatically:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Configure GitHub Actions or similar CI tool</li>
            <li>Run tests on every pull request and before deployment</li>
            <li>Set up test coverage reports</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Running Tests</h2>
          <p>Use these commands to run tests:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Unit and integration tests: <code>npm run test</code></li>
            <li>E2E tests: <code>npm run test:e2e</code></li>
            <li>Test coverage: <code>npm run test:coverage</code></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Testing;