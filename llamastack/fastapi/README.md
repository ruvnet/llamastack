# LlamaStack FastAPI Backend

This FastAPI application serves as the backend for the LlamaStack project, providing a set of endpoints for chat moderation, custom tools, and agentic system operations.

## Setup

1. Install the required dependencies:
   ```
   pip install fastapi uvicorn pydantic
   ```

2. Run the FastAPI server:
   ```
   python app.py
   ```

The server will start on `http://0.0.0.0:8000` with a keep-alive timeout of 120 seconds.

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

## Integration with Frontend

This FastAPI backend is designed to work seamlessly with the LlamaStack frontend. Ensure that the frontend is configured to send requests to the correct backend URL.

## Security Considerations

- Implement proper authentication and authorization mechanisms before deploying to production.
- Use HTTPS in production to encrypt data in transit.
- Regularly update dependencies to patch any security vulnerabilities.

## Contributing

Please read the main project's CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's LICENSE.md file for details.