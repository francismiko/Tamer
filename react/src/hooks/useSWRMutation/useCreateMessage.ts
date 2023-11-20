import useSWRMutation from 'swr/mutation';

export function useCreateMessage(): {
  createMessage: (arg: CreateMessageArg) => Promise<Response>;
  isMessageMutating: boolean;
} {
  const { trigger, isMutating } = useSWRMutation(
    '/message',
    async (url: string, { arg }: { arg: CreateMessageArg }) => {
      return fetch(import.meta.env.VITE_BACKEND_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: arg.message,
          chatId: arg.chatId,
        }),
      });
    },
  );

  return {
    createMessage: trigger,
    isMessageMutating: isMutating,
  };
}
