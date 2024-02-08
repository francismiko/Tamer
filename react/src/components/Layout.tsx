import { Loading } from "@/components/Loading";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SWRConfig } from "swr";

export function Layout(): JSX.Element {
	const { isLoaded, isSignedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			navigate("/signin");
		}
	}, [isSignedIn]);

	if (!isLoaded) {
		return (
			<main className="h-screen">
				<Loading />
			</main>
		);
	}

	return (
		<SWRConfig
			value={{
				fetcher: (url) =>
					fetch(import.meta.env.VITE_BACKEND_URL + url).then((res) =>
						res.json(),
					),
				refreshInterval: 1000 * 300,
			}}
		>
			<Sidebar />
			<main className="!pl-60 h-screen overflow-auto">
				<Outlet />
			</main>
		</SWRConfig>
	);
}
