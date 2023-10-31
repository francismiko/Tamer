import { Loading } from '@/components/Loading';
import { useCreateChat } from '@/hooks/useSWRMutation/useCreateChat';
import { useCallback, useState } from 'react';
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

export function ChatModal({
  showModal,
  setShowModal,
  owner,
}: ChatModalProps): JSX.Element {
  const { createChat, isMutating } = useCreateChat();
  const [title, setTitle] = useState('');
  const [chatModel, setChatModel] = useState('GPT-3.5-Turbo');
  const navigate = useNavigate();

  const handleCreate = useCallback(async () => {
    const { id } = await createChat({ title, chatModel, owner });
    navigate(`/dashboard/conversation/${id}`);
    setShowModal(false);
  }, [title, chatModel, owner]);

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
          <hr className="h-px bg-transparent border-t-0 opacity-25 bg-gradient-to-r from-transparent via-neutral-500 to-transparent dark:opacity-100" />
          {/* <!--Modal body--> */}
          <TEModalBody className="grid grid-cols-1 px-6 md:grid-cols-2 gap-x-6 gap-y-4">
            {modelCards.map(
              ({ iconUrl, model, parameters, context }, index) => (
                <div
                  key={index}
                  className={`flex flex-col rounded-xl bg-white drop-shadow-xl dark:bg-[#3f495c] md:max-w-xl md:flex-row md:h-16 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                    chatModel === model &&
                    'outline-none outline-white outline-3'
                  }`}
                  onClick={() => setChatModel(model)}
                >
                  <img
                    className="object-cover w-full aspect-square md:h-16 md:w-16 md:rounded-xl"
                    src={iconUrl}
                  />
                  <div className="flex flex-col justify-start px-2 py-1">
                    <p className="mb-1 text-sm font-medium text-neutral-800 dark:text-neutral-50">
                      {model}
                    </p>
                    <p className="text-xs font-light text-neutral-600 dark:text-neutral-300">
                      <strong>{parameters}</strong> parameters, up to{' '}
                      <strong>{context}</strong> token context.
                    </p>
                  </div>
                </div>
              ),
            )}
          </TEModalBody>
          <hr className="h-px bg-transparent border-t-0 opacity-25 bg-gradient-to-r from-transparent via-neutral-500 to-transparent dark:opacity-100" />
          <TEModalFooter className="!border-t-0">
            <TERipple rippleColor="light">
              <button
                type="button"
                className="h-9 w-24 items-center inline-block rounded bg-primary text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleCreate}
              >
                {isMutating ? <Loading size="md" /> : 'Create'}
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

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
