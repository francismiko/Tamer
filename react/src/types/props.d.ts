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
