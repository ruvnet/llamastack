# LlamaStack

LlamaStack is a cutting-edge AI platform developed by Meta, offering a comprehensive ecosystem for building and deploying sophisticated AI applications using Llama 3.1 models. It features advanced language models available in 8B, 70B, and 405B parameter versions, supporting multiple languages and boasting a 128K token context length.

The platform includes a standardized API, safety mechanisms like Llama Guard 3 and Prompt Guard, and powerful agentic capabilities for multi-step reasoning and autonomous decision-making.

With support for customization, tool use, and zero-shot learning, LlamaStack enables developers to create a wide range of applications, from intelligent chatbots and workflow assistants to coding aids and database interaction tools. By providing open-source implementations and encouraging community engagement, Meta aims to foster innovation while promoting responsible AI development.

Llama Stack UI created by rUv.

## Key Features

- AI-powered code analysis and suggestions
- Real-time collaboration tools
- Dynamic leaderboards and skill assessments
- Integrated development environment
- Chat moderation with Llama Guard
- Custom tools for enhanced functionality
- Agentic system operations

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_PROJECT_URL=your_supabase_project_url
VITE_SUPABASE_API_KEY=your_supabase_api_key
```

Replace `your_supabase_project_url` and `your_supabase_api_key` with your actual Supabase project URL and API key.

### Supabase Setup

1. Create a new Supabase project.
2. Run the SQL script in `./sql/init.sql` in your Supabase SQL editor to set up the necessary tables, views, and functions.

## API Endpoints

- GET `/`: Chat moderation with Llama Guard
- GET `/custom-tools`: Chat with custom tools
- GET `/main`: Main chat interface
- POST `/inference/batch_chat_completion`: Batch chat completion
- POST `/inference/batch_completion`: Batch text completion
- POST `/inference/chat_completion`: Single chat completion
- POST `/inference/completion`: Single text completion
- POST `/safety/run_shields`: Run safety shields
- POST `/agentic_system/memory_bank/attach`: Attach memory bank
- POST `/agentic_system/create`: Create agentic system
- POST `/agentic_system/session/create`: Create session
- POST `/agentic_system/turn/create`: Create turn
- POST `/agentic_system/delete`: Delete agentic system
- POST `/agentic_system/session/delete`: Delete session
- POST `/agentic_system/memory_bank/detach`: Detach memory bank
- POST `/agentic_system/session/get`: Get session details
- POST `/agentic_system/step/get`: Get step details
- POST `/agentic_system/turn/get`: Get turn details

For detailed API documentation, visit `http://0.0.0.0:8000/docs` after starting the server.

## Technology Stack

- Frontend: React.js with Vite
- Backend: Supabase (PostgreSQL database and authentication)
- Styling: Tailwind CSS
- State Management: React Query
- Routing: React Router

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
