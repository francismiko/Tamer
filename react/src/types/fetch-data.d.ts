type Chat = {
  id: string;
  owner: string;
  title: string;
  chat_model: ChatModel;
  create_at: Date;
  update_at: Date;
};

type ChatModel = {
  id: string;
  model: string;
  owner: string;
  chat_id: string;
  create_at: Date;
  update_at: Date;
};

type Message = {
  id: string;
  content: string;
  sender: 'Human' | 'AI';
  status: 'Pending' | 'Reject' | 'Done';
  chat_id: string;
  create_at: Date;
  update_at: Date;
};
