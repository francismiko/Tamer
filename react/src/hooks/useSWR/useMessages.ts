import useSWR, { KeyedMutator } from 'swr';

export function useMessages(chatId: string | undefined): {
  messages: Message[] | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<Message[]>;
} {
  const { data, error, isLoading, mutate } = useSWR<Message[]>(
    `/message?chat_id=${chatId}`,
  );

  return {
    messages: data,
    isLoading,
    isError: error,
    mutate,
  };
}
