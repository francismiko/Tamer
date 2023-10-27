type ChatModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  owner: string | undefined;
};

type LoadingProps = {
  size?: string;
};
