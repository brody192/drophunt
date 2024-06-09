import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomeRoute from "./routes/HomeRoute"

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeRoute />,
	},
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap"
				rel="stylesheet"
			/>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)
