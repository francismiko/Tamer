type Chat = {
  id: string;
  owner: string;
  title: string;
  chat_model: string;
  create_at: Date;
};

type Message = {
  id: string;
  content: string;
  sender: 'User' | 'Bot';
  status: 'Pending' | 'Reject' | 'Done';
  create_at: Date;
};
