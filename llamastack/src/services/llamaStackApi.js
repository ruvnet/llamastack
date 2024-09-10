import axios from 'axios';
import { getStoredApiEndpoint, getStoredApiKey } from '../utils/apiKeyStorage';

const createLlamaStackApi = async () => {
  const baseURL = await getStoredApiEndpoint();
  const apiKey = await getStoredApiKey();

  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  return {
    chatModeration: (params) => api.get('/', { params }),
    chatWithCustomTools: (params) => api.get('/custom-tools', { params }),
    mainChatInterface: (params) => api.get('/main', { params }),
    inferenceBatchChatCompletion: (data) => api.post('/inference/batch_chat_completion', data),
    inferenceBatchCompletion: (data) => api.post('/inference/batch_completion', data),
    inferenceChatCompletion: (data) => api.post('/inference/chat_completion', data),
    inferenceCompletion: (data) => api.post('/inference/completion', data),
    safetyRunShields: (data) => api.post('/safety/run_shields', data),
    agenticSystemMemoryBankAttach: (data) => api.post('/agentic_system/memory_bank/attach', data),
    agenticSystemCreate: (data) => api.post('/agentic_system/create', data),
    agenticSystemSessionCreate: (data) => api.post('/agentic_system/session/create', data),
    agenticSystemTurnCreate: (data) => api.post('/agentic_system/turn/create', data),
    agenticSystemDelete: (data) => api.post('/agentic_system/delete', data),
    agenticSystemSessionDelete: (data) => api.post('/agentic_system/session/delete', data),
    agenticSystemMemoryBankDetach: (data) => api.post('/agentic_system/memory_bank/detach', data),
    agenticSystemSessionGet: (data) => api.post('/agentic_system/session/get', data),
    agenticSystemStepGet: (data) => api.post('/agentic_system/step/get', data),
    agenticSystemTurnGet: (data) => api.post('/agentic_system/turn/get', data),
  };
};

export default createLlamaStackApi;