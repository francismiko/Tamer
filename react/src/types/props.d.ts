type ChatModalProps = {
  showChatModal: boolean;
  setShowChatModal: React.Dispatch<React.SetStateAction<boolean>>;
  owner: string | undefined;
};

type ChatModalTitleProps = {
  title: string | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowChatModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ChatModalBodyProps = {
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
};

type ChatModalFooterProps = {
  handleCreate: () => Promise<void>;
  isChatMutating: boolean;
  isChatModelMutating: boolean;
};

type DeleteChatModalProps = {
  chatId: string | undefined;
  showDeleteChatModal: boolean;
  setShowDeleteChatModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type LoadingProps = {
  size?: string;
};

type SidebarBodyProps = ChatProps & ConversationListProps;

type ChatProps = {
  setShowChatModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ConversationListProps = {
  chats: Chat[] | undefined;
  activeChat: number | undefined;
  setActiveChat: React.Dispatch<React.SetStateAction<number | undefined>>;
  setShowDeleteChatModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ConversationContentProps = {
  imageUrl: string | undefined;
  fullName: string | null | undefined;
  model: string | undefined;
  messages: Message[] | undefined;
  scrollRef: React.RefObject<HTMLDivElement>;
};

type ConversationFooterProps = {
  inputMessage: string;
  isMessageMutating: boolean;
  handleSubmitMessage: (
    event: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
};
