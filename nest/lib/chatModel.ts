import { ChatOpenAI } from 'langchain/chat_models/openai';

export const createGPTChatModel = (): ChatOpenAI => {
  return new ChatOpenAI(
    {
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 0.8,
      timeout: 10 * 1000,
    },
    {
      basePath:
        process.env.NODE_ENV === 'development'
          ? process.env.OPENAI_API_PROXY_URL
          : undefined,
    },
  );
};
