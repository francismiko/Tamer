import useSWRMutation from "swr/mutation";

export function useDeleteChat(): {
	deleteChat: (arg: DeleteChatArg) => Promise<Chat>;
	isChatMutating: boolean;
} {
	const { trigger, isMutating } = useSWRMutation(
		"/chat",
		async (url: string, { arg }: { arg: DeleteChatArg }) => {
			return fetch(`${import.meta.env.VITE_BACKEND_URL + url}/${arg.chatId}`, {
				method: "DELETE",
			}).then((res) => res.json());
		},
	);

	return {
		deleteChat: trigger,
		isChatMutating: isMutating,
	};
}
