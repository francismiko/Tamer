import useSWR from 'swr';

export function useChatsByOwner(owner: string | undefined): {
  chats: Chat[] | undefined;
  isLoading: boolean;
  isChatsError: Error;
} {
  const { data, error, isLoading } = useSWR<Chat[]>(`/chat?owner=${owner}`);

  return {
    chats: data,
    isLoading,
    isChatsError: error,
  };
}
