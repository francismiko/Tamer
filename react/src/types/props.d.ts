type ChatModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  owner: string | undefined;
};

type ChatModalTitleProps = {
  title: string | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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

type LoadingProps = {
  size?: string;
};

type SidebarBodyProps = ChatProps & ConversationListProps;

type ChatProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ConversationListProps = {
  chats: Chat[] | undefined;
  activeChat: number | undefined;
  setActiveChat: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleDeleteChat: (ChatId: string) => Promise<void>;
  handleUpdateChatTitle: () => Promise<void>;
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
