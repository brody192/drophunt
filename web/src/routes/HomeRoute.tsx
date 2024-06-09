import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
// TODO: should not be done this way (will fail in vercel deploy) (also failing locally too..)
// import { AppType } from "../../../api/src/api"
// import { hc } from "hono/client"
import { useQuery } from "@tanstack/react-query"
import { Ads, Airdrops, Global } from "@ronin/drophunt"
import Nav from "../components/Nav"

// TODO: breaking for some reason..
// const client = hc<AppType>("https://drophunt.nikiv.workers.dev")
// TODO: below should be inside queryFn of useQuery (but failing too..)
// const response = await client.index.$get()

export const HomeRouteState = proxy({
	activePage: "Airdrops" as "Airdrops" | "Claim" | "Earn",
	ads: [] as Ads,
	airdrops: [] as Airdrops,
	global: {} as Global,
})

export default function HomeRoute() {
	const local = useProxy(HomeRouteState)

	const { error, data, isFetching } = useQuery({
		queryKey: ["global"],
		queryFn: async () => {
			// TODO: ideally the return is typed using https://hono.dev/guides/rpc but its breaking due to bun workspaces or something else
			const apiUrl = import.meta.env.DEV
				? "http://localhost:8787"
				: "https://drophunt.nikiv.workers.dev"
			const res = await fetch(apiUrl)
			const resJson = await res.json()
			// hardcoding return into valtio proxy (ugly..)
			local.ads = resJson.ads
			local.airdrops = resJson.airdrops
			local.global = resJson.global
			// TODO: not sure how to best get data from react query response and put it into valtio proxy
			return true
		},
	})
	console.log(data, "data")

	if (isFetching) return <div>Loading...</div>
	if (error) return <div>Error: {JSON.stringify(error)}</div>
	// if (data) return <>{JSON.stringify(local.global)}</>
	if (data)
		return (
			<>
				<Nav />
			</>
		)
}
