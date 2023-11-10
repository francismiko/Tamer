import { useRef } from 'react';

export function Conversation(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  // 静态聊天数据
  const chatData = [
    { sender: 'user', message: '你好！' },
    { sender: 'bot', message: '你好，有什么我可以帮助你的吗？' },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto w-3/5 mx-auto">
        {chatData.map((chat, index) => (
          <div key={index} className="mb-4">
            <div className="font-bold">
              {chat.sender === 'user' ? 'user' : 'bot'}
            </div>
            <p className="antialiased">{chat.message}</p>
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
