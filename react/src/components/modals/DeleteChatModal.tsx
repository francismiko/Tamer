import { useDeleteChat } from "@/hooks/useSWRMutation";
import { useNavigate } from "react-router-dom";
import {
	TEModal,
	TEModalContent,
	TEModalDialog,
	TEModalFooter,
	TEModalHeader,
	TERipple,
} from "tw-elements-react";

export function DeleteChatModal(props: DeleteChatModalProps): JSX.Element {
	const { showDeleteChatModal, setShowDeleteChatModal, chatId, chatsMutate } =
		props;
	const { deleteChat } = useDeleteChat();
	const navigate = useNavigate();

	const handleDeleteChat = async (): Promise<void> => {
		if (!chatId) return;
		await deleteChat({ chatId });
		chatsMutate();
		setShowDeleteChatModal(false);
		navigate("/dashboard");
	};

	return (
		<div>
			{/* <!-- Modal --> */}
			<TEModal show={showDeleteChatModal} setShow={setShowDeleteChatModal}>
				<TEModalDialog>
					<TEModalContent>
						<TEModalHeader>
							{/* <!--Modal title--> */}
							<h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
								Delete conversation?
							</h5>
							{/* <!--Close button--> */}
							<button
								type="button"
								className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
								onClick={() => setShowDeleteChatModal(false)}
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
						<TEModalFooter>
							<TERipple rippleColor="light">
								<button
									type="button"
									className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
									onClick={() => setShowDeleteChatModal(false)}
								>
									Close
								</button>
							</TERipple>
							<TERipple rippleColor="light">
								<button
									type="button"
									className="ml-1 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
									onClick={handleDeleteChat}
								>
									Delete
								</button>
							</TERipple>
						</TEModalFooter>
					</TEModalContent>
				</TEModalDialog>
			</TEModal>
		</div>
	);
}
