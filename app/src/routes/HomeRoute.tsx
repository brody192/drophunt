import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import { Ads, Airdrop, Airdrops, Global } from "@ronin/drophunt"
import { useQuery } from "@tanstack/react-query"
import Nav from "@/components/Nav"
import AirdropsPage from "@/components/AirdropsPage"
import ClaimPage from "@/components/ClaimPage"
import EarnPage from "@/components/EarnPage"
import OpenedAirdropPage from "@/components/OpenedAirdropPage"
import Footer from "@/components/Footer"

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
			const apiUrl = "https://drophunt.nikiv.workers.dev"
			const res = await fetch(apiUrl)
			const resJson = await res.json()
			local.ads = resJson.ads
			local.airdrops = resJson.airdrops
			local.global = resJson.global
			return true
		},
	})

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
