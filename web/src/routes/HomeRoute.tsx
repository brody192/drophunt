import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
// TODO: should not be done this way (will fail in vercel deploy) (also failing locally too..)
// import { AppType } from "../../../api/src/api"
// import { hc } from "hono/client"
import { useQuery } from "@tanstack/react-query"
import { Ads, Airdrops, Global } from "@ronin/drophunt"

// TODO: breaking for some reason..
// const client = hc<AppType>("https://drophunt.nikiv.workers.dev")
// TODO: below should be inside queryFn of useQuery (but failing too..)
// const response = await client.index.$get()

export const HomeRouteState = proxy({
	ads: [] as Ads,
	airdrops: [] as Airdrops,
	global: {} as Global,
})

export default function HomeRoute() {
	const local = useProxy(HomeRouteState)

	const { error, data, isFetching } = useQuery({
		queryKey: ["global"],
		queryFn: async () => {
			const res = await fetch("https://drophunt.nikiv.workers.dev")
			const resJson = await res.json()
			console.log(resJson, "res!!!")
			local.ads = resJson.ads
			local.airdrops = resJson.airdrops
			local.global = resJson.global
			return "success"
		},
	})
	console.log(data, "data")

	if (isFetching) return <div>Loading...</div>
	if (error) return <div>Error: {JSON.stringify(error)}</div>
	if (data) return <>{JSON.stringify(local.global)}</>
}
