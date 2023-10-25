import useSWR from 'swr';

type Chat = {
  id: string;
  owner: string;
  title: string;
  chat_model: 'ChatGPT';
  create_at: Date;
};

export function useChat(owner: string | undefined): {
  chats: Chat[] | undefined;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR<Chat[]>(`/chat?owner=${owner}`);

  return {
    chats: data,
    isLoading,
    isError: error,
  };
}
