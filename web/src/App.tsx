import { useQuery } from "@tanstack/react-query"
import { hc } from "hono/client"
// import { proxy } from "valtio"
// import { useProxy } from "valtio/utils"
import { AppType } from "../../api/src/api"

// export const GlobalState = proxy({
// 	activePage: "Airdrops" as "Airdrops" | "Claim" | "Earn",
// 	activeFilters: [],
// })
// const client = hc<AppType>("http://localhost:8787")
const client = hc<AppType>("https://drophunt.nikiv.workers.dev")

export function HomeRoute() {
	// const local = useProxy(GlobalState)

	const { error, data, isFetching } = useQuery({
		queryKey: ["global"],
		queryFn: async () => {
			const response = await client.index.$get()
			return await response.json()
		},
	})
	console.log(data, "data")
	console.log(error, "error")
	if (error)
		return <div className="text-white">Error: {JSON.stringify(error)}</div>
	if (isFetching) return <div></div>
	if (data) {
		return <>{JSON.stringify(data)}</>
	}
}
