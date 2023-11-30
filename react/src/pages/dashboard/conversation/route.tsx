import { useChat, useMessages } from '@/hooks/useSWR';
import { useCreateMessage } from '@/hooks/useSWRMutation';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Conversation(): JSX.Element {
  const { user } = useUser();
  const { imageUrl, fullName } = user ?? {};
  const { id: chatId } = useParams();
  const { chat } = useChat(chatId);
  const { model } = chat?.chat_model ?? {};
  const { messages, messagesMutate } = useMessages(chatId);
  const { createMessage, isMessageMutating } = useCreateMessage();
  const [inputMessage, setInputMessage] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmitMessage = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (inputMessage && chatId) {
      const mockMessages: Message[] = [
        {
          id: new Date().getTime().toString(),
          content: inputMessage,
          status: 'Done',
          sender: 'Human',
          chat_id: chatId,
          create_at: new Date(),
          update_at: new Date(),
        },
        {
          id: new Date().getTime().toString() + '1',
          content: '',
          status: 'Done',
          sender: 'AI',
          chat_id: chatId,
          create_at: new Date(),
          update_at: new Date(),
        },
      ];
      setInputMessage('');

      messagesMutate((prev) => [...(prev ?? []), ...mockMessages], {
        revalidate: false,
      });

      const res = await createMessage({ message: inputMessage, chatId });
      const reader = res.body?.getReader();
      const textDecoder = new TextDecoder();
      if (!reader) return;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) return;

        const decodedChunk = textDecoder
          .decode(value, { stream: true })
          .split('\n\n')
          .map((line) => line.match(/data: "(.*)"/)?.[1] || '')
          .join('');

        messagesMutate(
          (prev) => {
            const prevMsg = prev ?? [];
            const newPrev = {
              ...prevMsg.slice(-1)[0],
              content: prevMsg.slice(-1)[0].content + decodedChunk,
            };
            return [...prevMsg.slice(0, -1), newPrev];
          },
          {
            revalidate: false,
          },
        );
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex flex-col h-screen relative">
      <ConversationContent
        {...{ imageUrl, fullName, model, messages, scrollRef }}
      />
      <ConversationFooter
        {...{
          inputMessage,
          handleSubmitMessage,
          setInputMessage,
          isMessageMutating,
        }}
      />
    </main>
  );
}

function ConversationContent(props: ConversationContentProps): JSX.Element {
  const { imageUrl, fullName, model, messages, scrollRef } = props;

  return (
    <>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 p-1 bg-white/30 backdrop-blur-sm z-10 rounded-bl-xl rounded-br-xl text-center">
        <p className="font-bold">{model}</p>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages?.map(
          (msg) =>
            msg.status === 'Done' && (
              <div key={msg.id} className="pb-5 my-5">
                <div className="w-3/5 mx-auto">
                  <div className="mb-2 flex items-center">
                    <img
                      className="h-8 w-8 md:rounded-full"
                      src={msg.sender === 'Human' ? imageUrl : `/${model}.svg`}
                      draggable="false"
                    />
                    {msg.sender === 'Human' && (
                      <span className="ml-2">{fullName}</span>
                    )}
                  </div>
                  <span className="antialiased">{msg.content}</span>
                </div>
              </div>
            ),
        )}
      </div>
    </>
  );
}

function ConversationFooter(props: ConversationFooterProps): JSX.Element {
  const {
    inputMessage,
    handleSubmitMessage,
    setInputMessage,
    isMessageMutating,
  } = props;

  return (
    <form
      onSubmit={handleSubmitMessage}
      className="p-6 border-t border-slate-400 flex"
    >
      <input
        type="text"
        value={inputMessage}
        placeholder="输入你的消息..."
        className="w-3/5 p-4 bg-slate-600 rounded-lg focus:outline outline-gray-400 mx-auto"
        onChange={(e) => setInputMessage(e.target.value)}
        disabled={isMessageMutating}
      />
    </form>
  );
}
