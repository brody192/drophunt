import { useQuery } from "@tanstack/react-query"
import { hc } from "hono/client"
import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import "./IndexPage.css"

export const GlobalState = proxy({
	activePage: "Airdrops" as "Airdrops" | "Claim" | "Earn",
	activeFilters: [],
})
// const client = hc<AppType>("https://drophunt.nikiv.workers.dev")

export function HomeRoute() {
	const local = useProxy(GlobalState)
	return <>ronin test</>

	// const { isPending, error, data, isFetching } = useQuery({
	// 	queryKey: ["global"],
	// 	queryFn: async () => {
	// 		const response = await client.index.$get()
	// 		return await response.json()
	// 	},
	// })
	// console.log(data, "data")

	// if (error)
	// 	return <div className="text-white">Error: {JSON.stringify(error)}</div>
	// // TODO: add loader in middle of screen
	// if (isFetching) return <div></div>
	// if (data) {
	// 	return <>ronin test</>
	// }
}
