import { useChat } from '@/hooks/useSWR/useChat';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

const chatData = [
  { sender: 'user', message: '你好！' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
];

export function Conversation(): JSX.Element {
  const { id } = useParams();
  const { chat } = useChat(id);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current?.value) {
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
      <div className="flex-1 overflow-y-auto">
        {chatData.map((chat, index) => (
          <div
            key={index}
            className={`py-4 ${chat.sender === 'user' && 'bg-slate-600'}`}
          >
            <div className="w-3/5 mx-auto">
              <div className="font-bold">
                {chat.sender === 'user' ? 'user' : 'bot'}
              </div>
              <p className="antialiased">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
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
