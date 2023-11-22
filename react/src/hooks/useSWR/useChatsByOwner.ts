import useSWR, { KeyedMutator } from 'swr';

export function useChatsByOwner(owner: string | undefined): {
  chats: Chat[] | undefined;
  isLoading: boolean;
  isChatsError: Error;
  chatsMutate: KeyedMutator<Chat[]>;
} {
  const { data, error, isLoading, mutate } = useSWR<Chat[]>(
    `/chat?owner=${owner}`,
  );

  return {
    chats: data,
    isLoading,
    isChatsError: error,
    chatsMutate: mutate,
  };
}
