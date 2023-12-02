import { useChat, useMessages } from '@/hooks/useSWR';
import { useCreateMessage } from '@/hooks/useSWRMutation';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

export function Conversation(): JSX.Element {
  const { user } = useUser();
  const { imageUrl } = user ?? {};
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
      const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();

      if (!reader) return;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) return;

        messagesMutate(
          (prev) => {
            const prevMsg = prev ?? [];
            const newPrev = {
              ...prevMsg.slice(-1)[0],
              content: prevMsg.slice(-1)[0].content + value,
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
      <ConversationContent {...{ imageUrl, model, messages, scrollRef }} />
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
  const { imageUrl, model, messages, scrollRef } = props;

  return (
    <>
      <span className="absolute left-4 top-4 inset-0 flex justify-center items-center w-36 h-12 p-1 bg-primary-100 backdrop-blur-sm z-10 rounded-md text-center whitespace-nowrap px-[0.65em] pb-[0.25em] pt-[0.35em] align-baseline text-xl font-bold leading-none text-gray-900">
        {model}
      </span>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages?.map(
          (msg) =>
            msg.status === 'Done' && (
              <div key={msg.id} className="pb-4 mb-2">
                <div className="w-3/5 mx-auto">
                  <div className="relative inline-block right-12 top-8 items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={msg.sender === 'Human' ? imageUrl : `/${model}.svg`}
                      draggable="false"
                    />
                  </div>
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    className="whitespace-pre-wrap"
                  >
                    {msg.content}
                  </Markdown>
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
      className="flex items-center justify-between px-2 py-6 md:px-10"
    >
      <div className="flex w-1/5 absolute space-x-3">
        <button
          type="button"
          className="inline-block rounded-md w-1/4 h-6 bg-info text-sm font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
          onClick={() =>
            setInputMessage(
              `按步骤实现:
              1 - 基于我所在水平的词汇库中随机选出5个不同词性的英文词汇和词组;
              2 - 生成每个对应词汇的详细中文释义和英文例句;
              3 - 将之前的内容绘制成表格,包含有以下字段:<英文词汇>,<词性>(缩写),<中文释义>,<例句>;
              仅输出最终的Markdown表格,省略中间过程展示`,
            )
          }
        >
          词汇
        </button>
        <button
          type="button"
          className="inline-block rounded-md w-1/4 h-6 bg-info text-sm font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
          onClick={() =>
            setInputMessage(
              `生成3个'符合我英语水平'的、'有内容深度'的中译英考试题目,包含需要翻译的'中文句子','答案'`,
            )
          }
        >
          翻译
        </button>
        <button
          type="button"
          className="inline-block rounded-md w-1/4 h-6 bg-info text-sm font-medium uppercase leading-normal text-slate-100 shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
        >
          阅读
        </button>
      </div>
      <input
        type="text"
        value={inputMessage}
        placeholder="输入你的消息..."
        className="w-3/5 w p-4 bg-slate-600 rounded-lg focus:outline-none outline-gray-400 mx-auto"
        onChange={(e) => setInputMessage(e.target.value)}
        disabled={isMessageMutating}
      />
    </form>
  );
}
