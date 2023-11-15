type CreateChatArg = {
  chatModel: string;
  title: string;
  owner: string | undefined;
};

type CreateMessageArg = {
  message: string;
  chatId: string;
};
