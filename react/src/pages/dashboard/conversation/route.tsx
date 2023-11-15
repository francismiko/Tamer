import { useChat } from '@/hooks/useSWR/useChat';
import { useMessages } from '@/hooks/useSWR/useMessages';
import { useCreateMessage } from '@/hooks/useSWRMutation/useCreateMessage';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Conversation(): JSX.Element {
  const { id } = useParams();
  const { chat } = useChat(id);
  const { messages, mutate } = useMessages(id);
  const { createMessage, isMutating } = useCreateMessage();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue && id) {
      const message = inputValue;
      const newMsg: Message = {
        id: new Date().getTime().toString(),
        content: message,
        status: 'Done',
        sender: 'Human',
        create_at: new Date(),
      };
      setInputValue('');

      mutate((prev) => [...(prev || []), newMsg], {
        revalidate: false,
      });

      const res = await createMessage({
        message: inputValue,
        chatId: id,
      });
      console.log(res);
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
            {messages?.map(
              (msg) =>
                msg.status === 'Done' && (
                  <div key={msg.id} className="py-4">
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
          value={inputValue}
          placeholder="输入你的消息..."
          className="w-3/5 p-4 bg-gray-600 rounded-lg focus:outline-none mx-auto"
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isMutating}
        />
      </form>
    </div>
  );
}
