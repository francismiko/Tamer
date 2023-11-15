import { useChat } from '@/hooks/useSWR/useChat';
import { useCreateMessage } from '@/hooks/useSWRMutation/useCreateMessage';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

const messages: Message[] = [
  {
    id: '111',
    sender: 'Human',
    content: '你好！',
    status: 'Done',
    create_at: new Date('2021-08-01T00:00:00Z'),
  },
  {
    id: '112',
    sender: 'AI',
    content: '你好，有什么我可以帮助你的吗？',
    status: 'Done',
    create_at: new Date('2021-08-01T00:00:00Z'),
  },
];

export function Conversation(): JSX.Element {
  const { id } = useParams();
  const { chat } = useChat(id);
  const { createMessage } = useCreateMessage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current?.value && id) {
      const res = await createMessage({
        message: inputRef.current?.value,
        chatId: id,
      });
      console.log({ res });
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-screen relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 p-2 bg-white/30 backdrop-blur-sm z-10 rounded-bl-xl rounded-br-xl">
        <div className="text-center">
          <p className="font-bold">{chat?.chat_model}</p>
        </div>
      </div>
      {useMemo(
        () => (
          <div className="flex-1 overflow-y-auto">
            {messages.map(
              (msg) =>
                msg.status === 'Done' && (
                  <div
                    key={msg.id}
                    className={`py-4 ${
                      msg.sender === 'Human' && 'bg-slate-600'
                    }`}
                  >
                    <div className="w-3/5 mx-auto">
                      <div className="font-bold">
                        {msg.sender === 'Human' ? 'user' : 'bot'}
                      </div>
                      <p className="antialiased">{msg.content}</p>
                    </div>
                  </div>
                ),
            )}
          </div>
        ),
        [messages],
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 border-t border-slate-400 flex"
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="输入你的消息"
          className="w-3/5 p-4 bg-gray-600 rounded-lg focus:outline-none mx-auto"
        />
      </form>
    </div>
  );
}
