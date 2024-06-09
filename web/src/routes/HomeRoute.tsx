import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import { hc } from "hono/client"
// TODO: should not be done this way (will fail in vercel deploy)
import { AppType } from "../../../api/src/api"
import { useQuery } from "@tanstack/react-query"

export const HomeRouteState = proxy({})

const client = hc<AppType>("https://drophunt.nikiv.workers.dev")

export default function HomeRoute() {
	const local = useProxy(HomeRouteState)

	const { error, data, isFetching } = useQuery({
		queryKey: ["global"],
		queryFn: async () => {
			// const response = await client.index.$get()
			const res = await fetch("https://drophunt.nikiv.workers.dev")
			console.log(res, "res")
			return await res.json()
		},
	})
	console.log(data, "data")

	if (isFetching) return <div>Loading...</div>
	if (error) return <div>Error: {JSON.stringify(error)}</div>
	if (data) return <>{JSON.stringify(data)}</>
}
