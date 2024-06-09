import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
// TODO: should not be done this way (will fail in vercel deploy) (also failing locally too..)
// import { AppType } from "../../../api/src/api"
// import { hc } from "hono/client"
import { Ads, Airdrop, Airdrops, Global } from "@ronin/drophunt"
import { useQuery } from "@tanstack/react-query"
import AirdropsPage from "../components/AirdropsPage"
import Nav from "../components/Nav"
import ClaimPage from "../components/ClaimPage"
import EarnPage from "../components/EarnPage"
import Footer from "../components/Footer"
import OpenedAirdropPage from "../components/OpenedAirdropPage"

// TODO: breaking for some reason..
// const client = hc<AppType>("https://drophunt.nikiv.workers.dev")
// TODO: below should be inside queryFn of useQuery (but failing too..)
// const response = await client.index.$get()

export const HomeRouteState = proxy({
	activePage: "Airdrops" as "Airdrops" | "Claim" | "Earn" | "OpenedAirdrop",
	activeFilters: [] as string[],
	openedAirdrop: null as Airdrop | null,
	openFilterMenu: false,
	availableFilterOptions: ["The Open Network", "Solana", "Polygon", "Ethereum"],
	// TODO: remove, comes from `global`
	blockchainLogos: {
		Solana:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/7cc8408f-0eb4-4d78-9747-ffc2408a0230",
		"The Open Network":
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/2afb1096-84f9-4e69-8376-d70f21dc5870",
		Polygon:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/e640d8e8-52ab-4a74-8f59-387e5c00724c",
		Ethereum:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/05911aa3-9777-49a2-8c76-0189d8ef91fc",
	},
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

	// ..
	if (isFetching) return <div className="text-white">Loading...</div>
	if (error) return <div>Error: {JSON.stringify(error)}</div>
	if (data)
		return (
			<>
				<div className="flex w-screen h-screen items-center justify-center">
					<div className="w-[380px] h-[560px] bg-black overflow-auto rounded-[20px] border-2 border-slate-400/30">
						<div className="py-[34px] px-[15px] text-white text-[14px] flex flex-col gap-[22px]">
							<Nav />
							<div className="w-full rounded-[20px] flex items-center justify-center bg-[#2e2e2e]">
								<img
									src={local.ads[0].image.src}
									className="w-full h-full object-cover"
								/>
							</div>
							{(() => {
								switch (local.activePage) {
									case "Airdrops":
										return <AirdropsPage />
									case "Claim":
										return <ClaimPage />
									case "Earn":
										return <EarnPage />
									case "OpenedAirdrop":
										return <OpenedAirdropPage />
									default:
										return <></>
								}
							})()}
						</div>
						<Footer />
					</div>
				</div>
			</>
		)
}
