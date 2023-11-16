import { ChatOpenAI } from 'langchain/chat_models/openai';

export const createGPTChatModel = (): ChatOpenAI => {
  return new ChatOpenAI(
    {
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo-1106',
      temperature: 1,
      timeout: 15 * 1000,
      streaming: true,
    },
    {
      basePath:
        process.env.NODE_ENV === 'development'
          ? process.env.OPENAI_API_PROXY_URL
          : undefined,
    },
  );
};
