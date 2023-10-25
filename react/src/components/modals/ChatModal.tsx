import React, { useCallback, useState } from 'react';
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

interface ChatModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  owner: string | undefined;
}

export function ChatModal({
  showModal,
  setShowModal,
  owner,
}: ChatModalProps): JSX.Element {
  const [title, setTitle] = useState('');

  const handleCreate = useCallback(() => {
    fetch('http://[::1]:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title || 'new Conversation',
        owner,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('成功创建：', data);
      })
      .catch((error) => {
        console.error('创建失败：', error);
      });
  }, [title, owner]);

  return (
    <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
      <TEModalDialog centered>
        <TEModalContent className="!bg-gray-700">
          <TEModalHeader className="!border-b-0">
            {/* <!--Modal title--> */}
            <TEInput
              size="lg"
              type="text"
              label="Conversation Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </TEModalHeader>
          <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          {/* <!--Modal body--> */}
          <TEModalBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modelCards.map(({ iconUrl, model, parameters, context }) => (
              <div className="flex flex-col rounded-xl bg-white drop-shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row md:h-16">
                <img
                  className="w-full aspect-square object-cover md:h-16 md:w-16 md:rounded-xl"
                  src={iconUrl}
                />
                <div className="flex flex-col justify-start py-1 px-2">
                  <p className="mb-1 text-sm font-medium text-neutral-800 dark:text-neutral-50">
                    {model}
                  </p>
                  <p className="text-xs font-light text-neutral-600 dark:text-neutral-300">
                    <strong>{parameters}</strong> parameters, up to{' '}
                    <strong>{context}</strong> token context.
                  </p>
                </div>
              </div>
            ))}
          </TEModalBody>
          <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          <TEModalFooter className="!border-t-0">
            <TERipple rippleColor="light">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </TERipple>
            <TERipple rippleColor="light">
              <button
                type="button"
                className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleCreate}
              >
                Create
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

type ModelCard = {
  iconUrl: string;
  model: string;
  parameters: string;
  context: string;
};

const modelCards: ModelCard[] = [
  {
    iconUrl: '/chatgpt.svg',
    model: 'GPT-3.5-Turbo',
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
