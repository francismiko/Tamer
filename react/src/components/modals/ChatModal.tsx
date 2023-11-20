import { Loading } from '@/components/Loading';
import { useCreateChat, useCreateChatModel } from '@/hooks/useSWRMutation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TEInput,
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalFooter,
  TEModalHeader,
  TERipple,
} from 'tw-elements-react';

export function ChatModal(props: ChatModalProps): JSX.Element {
  const { showModal, setShowModal, owner } = props;
  const { createChat, isChatMutating } = useCreateChat();
  const { createChatModel, isChatModelMutating } = useCreateChatModel();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string | undefined>();
  const [model, setModel] = useState<string>('gpt-3.5-turbo-1106');

  const handleCreate = async () => {
    const { id: chatId } = await createChat({ title, owner });
    await createChatModel({ model, owner, chatId });
    navigate(`/dashboard/conversation/${chatId}`);
    setShowModal(false);
  };

  return (
    <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
      <TEModalDialog centered>
        <TEModalContent className="!bg-gray-700">
          <ChatModalTitle
            title={title}
            setTitle={setTitle}
            setShowModal={setShowModal}
          />
          <hr className="h-px bg-transparent border-t-0 opacity-25 bg-gradient-to-r from-transparent via-neutral-500 to-transparent dark:opacity-100" />
          <ChatModalBody model={model} setModel={setModel} />
          <hr className="h-px bg-transparent border-t-0 opacity-25 bg-gradient-to-r from-transparent via-neutral-500 to-transparent dark:opacity-100" />
          <ChatModalFooter
            handleCreate={handleCreate}
            isChatMutating={isChatMutating}
            isChatModelMutating={isChatModelMutating}
          />
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

function ChatModalTitle(props: ChatModalTitleProps): JSX.Element {
  const { title, setTitle, setShowModal } = props;

  return (
    <TEModalHeader className="!border-b-0">
      <TEInput
        size="lg"
        type="text"
        label="Conversation Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="button"
        className="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
        onClick={() => setShowModal(false)}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </TEModalHeader>
  );
}

function ChatModalBody(props: ChatModalBodyProps): JSX.Element {
  const { model, setModel } = props;

  // TODO: use dynamic card
  const modelCards: ModelCard[] = [
    {
      iconUrl: '/gpt-3.5-turbo-1106.svg',
      model: 'gpt-3.5-turbo-1106',
      parameters: '175b',
      context: '4k',
    },
    {
      iconUrl: '/gpt4.svg',
      model: 'GPT-4',
      parameters: '1760b',
      context: '8k',
    },
    {
      iconUrl: '/meta.svg',
      model: 'Llama-2',
      parameters: '13b',
      context: '4k',
    },
    {
      iconUrl: '/claude.svg',
      model: 'Claude-2',
      parameters: '137b',
      context: '100k',
    },
    {
      iconUrl: '/chatglm.svg',
      model: 'ChatGLM',
      parameters: '6b',
      context: '2k',
    },
  ];

  return (
    <TEModalBody className="grid grid-cols-1 px-6 md:grid-cols-2 gap-x-6 gap-y-4">
      {modelCards.map((card, index) => (
        <div
          key={index}
          className={`flex flex-col rounded-xl bg-white drop-shadow-xl dark:bg-[#3f495c] md:max-w-xl md:flex-row md:h-16 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer ${
            model === card.model && 'outline-none outline-white outline-3'
          }`}
          onClick={() => setModel(card.model)}
        >
          <img
            className="object-cover w-full aspect-square md:h-16 md:w-16 md:rounded-xl"
            src={card.iconUrl}
            draggable="false"
          />
          <div className="flex flex-col justify-start px-2 py-1">
            <p className="mb-1 text-sm font-medium text-neutral-800 dark:text-neutral-50">
              {card.model}
            </p>
            <p className="text-xs font-light text-neutral-600 dark:text-neutral-300">
              <strong>{card.parameters}</strong> parameters, up to{' '}
              <strong>{card.context}</strong> token context.
            </p>
          </div>
        </div>
      ))}
    </TEModalBody>
  );
}

function ChatModalFooter(props: ChatModalFooterProps): JSX.Element {
  const { handleCreate, isChatMutating, isChatModelMutating } = props;

  return (
    <TEModalFooter className="!border-t-0">
      <TERipple rippleColor="light">
        <button
          type="button"
          className="h-9 w-24 items-center inline-block rounded bg-primary text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleCreate}
        >
          {isChatMutating || isChatModelMutating ? (
            <Loading size="md" />
          ) : (
            'Create'
          )}
        </button>
      </TERipple>
    </TEModalFooter>
  );
}
