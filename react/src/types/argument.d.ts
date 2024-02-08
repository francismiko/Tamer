type CreateChatArg = {
	title: string | undefined;
	owner: string | undefined;
};

type CreateChatModelArg = {
	model: string;
	owner: string | undefined;
	chatId: string;
};

type CreateMessageArg = {
	message: string;
	chatId: string;
};

type DeleteChatArg = {
	chatId: string;
};
