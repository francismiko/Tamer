type CreateChatArg = {
  chatModel: string;
  title: string | undefined;
  owner: string | undefined;
};

type CreateMessageArg = {
  message: string;
  chatId: string;
};
