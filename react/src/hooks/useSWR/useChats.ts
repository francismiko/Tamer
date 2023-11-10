import useSWR from 'swr';

export function useChats(owner: string | undefined): {
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
