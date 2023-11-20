import useSWRMutation from 'swr/mutation';

export function useCreateChat(): {
  createChat: (arg: CreateChatArg) => Promise<Chat>;
  isChatMutating: boolean;
} {
  const { trigger, isMutating } = useSWRMutation(
    '/chat',
    async (url: string, { arg }: { arg: CreateChatArg }) => {
      return fetch(import.meta.env.VITE_BACKEND_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: arg.title ?? 'new Conversation',
          owner: arg.owner,
        }),
      }).then((res) => res.json());
    },
  );

  return {
    createChat: trigger,
    isChatMutating: isMutating,
  };
}
