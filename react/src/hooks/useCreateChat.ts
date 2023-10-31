import useSWRMutation from 'swr/mutation';

export function useCreateChat(): {
  createChat: (arg: {
    chatModel: string;
    title: string;
    owner: string | undefined;
  }) => Promise<Chat>;
  isMutating: boolean;
} {
  const { trigger, isMutating } = useSWRMutation(
    '/api/user',
    async (
      url,
      {
        arg,
      }: {
        arg: {
          chatModel: string;
          title: string;
          owner: string | undefined;
        };
      },
    ) => {
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          title: arg.title || 'new Conversation',
          chat_model: arg.chatModel,
          owner: arg.owner,
        }),
      }).then((res) => res.json());
    },
  );

  return {
    createChat: trigger,
    isMutating,
  };
}
