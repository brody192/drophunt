import Icons from "@/components/Icons"
import { useQuery } from "@tanstack/react-query"
import { useUtils } from "@tma.js/sdk-react"
import { TonConnectButton } from "@tonconnect/ui-react"
import { useState } from "react"
import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import { onClickWithoutBubblingToTheParentOnClicks } from "../../../lib/utils"
import "./IndexPage.css"
import { Airdrop } from "@ronin/drophunt"

export const GlobalState = proxy({
	activePage: "Airdrops" as "Airdrops" | "Claim" | "Earn",
	activeFilters: [],
	openedAirdrop: null,
	openFilterMenu: false,
})

// ..
export function IndexPage() {
	const local = useProxy(GlobalState)
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ["data"],
		queryFn: () =>
			// fetch("https://nikiv-drophunt.web.val.run").then((res) => res.json()),
			fetch("https://drophunt.nikiv.workers.dev").then((res) => res.json()),
	})
	console.log(data, "data")

	const utils = useUtils()
	// local state
	const [activePage, setActivePage] = useState<"Airdrops" | "Claim" | "Earn">(
		"Airdrops"
	)
	const [activeFilters, setActiveFilters] = useState([])
	const [openedAirdrop, setOpenedAirdrop] = useState<Airdrop | null>(null)
	const [openFilterMenu, setOpenFilterMenu] = useState(false)
	const [availableFilterOptions] = useState([
		"The Open Network",
		"Solana",
		"Polygon",
		"Ethereum",
	])
	const [blockchainLogos] = useState({
		Solana:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/7cc8408f-0eb4-4d78-9747-ffc2408a0230",
		"The Open Network":
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/2afb1096-84f9-4e69-8376-d70f21dc5870",
		Polygon:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/e640d8e8-52ab-4a74-8f59-387e5c00724c",
		Ethereum:
			"https://storage.ronin.co/spa_ytxzy7a722jx52um/05911aa3-9777-49a2-8c76-0189d8ef91fc",
	})

	if (error) return <div>Error has occurred. {JSON.stringify(error)}</div>
	if (isFetching) return <div></div>
	if (data) {
		return (
			<>
				{
					<div className="py-[34px] px-[15px] text-white text-[14px] flex flex-col gap-[22px]">
						<div className="flex justify-between items-center">
							{/* if no airdrop is open, then show nav bar */}
							{openedAirdrop === null ? (
								<div className="flex bg-[#191919] text-[12px] rounded-full h-[33px] items-center font-light">
									<div
										onClick={() => {
											setActivePage("Airdrops")
										}}
										style={activePage === "Airdrops" ? { fontWeight: 600 } : {}}
										className={`p-2 px-4 h-full flex cursor-pointer items-center justify-center rounded-full ${
											activePage === "Airdrops" ? "bg-[#2E2E2E]" : ""
										}`}
									>
										Airdrops
									</div>
									<div
										onClick={() => {
											setActivePage("Claim")
										}}
										style={activePage === "Claim" ? { fontWeight: 600 } : {}}
										className={`p-2 px-4 h-full flex cursor-pointer items-center justify-center rounded-full ${
											activePage === "Claim" ? "bg-[#2E2E2E]" : ""
										}`}
									>
										Claim
									</div>
									<div
										onClick={() => {
											setActivePage("Earn")
										}}
										style={activePage === "Earn" ? { fontWeight: 600 } : {}}
										className={`p-2 px-4 h-full cursor-pointer flex items-center justify-center rounded-full ${
											activePage === "Earn" ? "bg-[#2E2E2E]" : ""
										}`}
									>
										Earn
									</div>
								</div>
							) : (
								<div
									onClick={() => {
										setOpenedAirdrop(null)
									}}
									className="cursor-pointer hover:scale-[1.1] transition-all"
								>
									<Icons name="Back" />
								</div>
							)}
							{/* TODO: make it green and move it properly */}
							<div className="pb-[14px]">
								<TonConnectButton className="ton-connect-page__button" />
							</div>
						</div>
						{/* Ads */}
						<div className="w-full rounded-[20px] flex items-center justify-center bg-[#2e2e2e]">
							<img
								src={data.ads[0].image.src}
								className="w-full h-full object-cover"
							/>
						</div>
						{(() => {
							switch (activePage) {
								case "Airdrops":
									return (
										<>
											{openedAirdrop !== null && (
												<>
													{/* opened airdrop content */}
													<div className="flex flex-col justify-between items-center w-full gap-[22px]">
														<div className="h-full overflow-hidden bg-[#2E2E2E] w-full rounded-[20px]">
															<div className="flex gap-3 items-center px-4 p-3">
																{/* @ts-ignore */}
																{openedAirdrop?.image?.src && (
																	<img
																		// @ts-ignore
																		src={openedAirdrop.image.src}
																		className="w-[50px] h-[50px] bg-[#3a3a3a] rounded-full"
																	/>
																)}
																<div className="flex flex-col">
																	<div className="text-[22px] font-bold">
																		{openedAirdrop.name}
																	</div>
																	<div className="flex gap-2 items-center">
																		<div className="bg-[#189A4C] px-3 p-1 rounded-full">
																			{openedAirdrop.active && "Active"}
																		</div>
																		<div className="border rounded-full border-[#3A3A3A] px-3 p-1">
																			{openedAirdrop.blockchain}
																		</div>
																	</div>
																</div>
															</div>
															<div className="bg-[#232323] w-full p-4">
																<div className="text-sm text-white/70 font-light">
																	{openedAirdrop.description}
																</div>
															</div>
															<div className="bg-[#191919] w-full p-4">
																<div className="font-bold text-[20px]">
																	Conditions
																</div>
																{openedAirdrop.conditions
																	.split("\n")
																	.map((condition, index) => {
																		return (
																			<div
																				key={index}
																				className="flex items-center w-full gap-2 text-white/60 text-[12px]"
																			>
																				<div className="w-[8px] h-[8px] bg-[#189A4C] rounded-full"></div>
																				{condition}
																			</div>
																		)
																	})}
															</div>
														</div>
														<div className="text-[20px] tracking-tighter font-bold bg-[#191919] rounded-[20px] flex flex-col items-center justify-center w-full p-4">
															<div>Remaining Time</div>
															<div>
																96 hours
																{/* TODO: make it work */}
																{/* {Math.ceil(
																	(openedAirdrop.activeUntil.getTime() -
																		new Date().getTime()) /
																		(1000 * 60 * 60)
																)}{" "}
																hours */}
															</div>
														</div>
														<button
															className="bg-[#23C463] rounded-full w-full p-4 text-[18px] mt-[20px]"
															onClick={() => {
																// utils.openTelegramLink(
																// 	"https://t.me/pepetondrop_bot"
																// )
																utils.openTelegramLink(openedAirdrop.actionUrl)
															}}
														>
															Action
														</button>
													</div>
												</>
											)}
											{openedAirdrop === null && (
												<div className="flex flex-col gap-[12px]">
													<div
														className="font-bold text-[18px]"
														style={{
															fontFamily: "Dela Gothic One",
														}}
													>
														Airdrops
													</div>
													<div className="flex items-center justify-between">
														<>
															{openFilterMenu ? (
																<div
																	onClick={() => {
																		setOpenFilterMenu(false)
																	}}
																	className="fixed top-0 left-0 w-screen h-screen bg-black/80"
																></div>
															) : null}
															<button
																onClick={() => {
																	setOpenFilterMenu(!openFilterMenu)
																}}
																className="flex gap-2 items-center justify-center border rounded-full border-[#3A3A3A] py-[10px] px-[14px] relative"
															>
																{activeFilters.length === 0 && (
																	<div className="bg-[#189A4C] rounded-full h-[16px] w-[16px]"></div>
																)}
																{activeFilters.length > 0 &&
																	activeFilters.map((filter, index) => {
																		return (
																			<img
																				key={index}
																				style={{
																					width: "15px",
																					height: "15px",
																				}}
																				// @ts-ignore
																				src={blockchainLogos[filter]}
																			/>
																		)
																	})}

																{activeFilters.length === 0
																	? "All"
																	: activeFilters[0]}
																{activeFilters.length > 1 && ", ..."}
																<Icons name="ArrowDown" size={[20, 20]} />
																{openFilterMenu ? (
																	<div
																		onClick={(e) => {
																			onClickWithoutBubblingToTheParentOnClicks(
																				e
																			)
																		}}
																		className="absolute top-[120%] left-0 flex flex-col gap-4 bg-[#191919] rounded-[12px] min-w-[240px] pb-[10px] px-[10px] pt-[10px]"
																	>
																		<div className="flex flex-col gap-1">
																			<div
																				onClick={() => {
																					setActiveFilters([])
																				}}
																				className="w-full flex items-center justify-between hover:bg-neutral-800 rounded-md px-4 p-2"
																			>
																				All
																				<div
																					className={`w-[16px] h-[16px] flex items-center justify-center rounded-[1px] ${
																						activeFilters.length === 0
																							? "bg-green-500"
																							: "bg-white"
																					}`}
																				></div>
																			</div>
																			{availableFilterOptions.map(
																				(filterOption, index) => {
																					return (
																						<div
																							key={index}
																							className="flex items-center"
																						>
																							<img
																								src={
																									// @ts-ignore
																									blockchainLogos[filterOption]
																								}
																								style={{
																									width: "15px",
																									height: "15px",
																								}}
																							/>
																							<div
																								key={index}
																								onClick={() => {
																									if (
																										activeFilters.includes(
																											// @ts-ignore
																											filterOption
																										)
																									) {
																										setActiveFilters(
																											activeFilters.filter(
																												(f) => {
																													return (
																														f !== filterOption
																													)
																												}
																											)
																										)
																									} else {
																										setActiveFilters([
																											// @ts-ignore
																											...activeFilters,
																											// @ts-ignore
																											filterOption,
																										])
																									}
																								}}
																								className="w-full flex items-center justify-between hover:bg-neutral-800 rounded-md px-4 p-2"
																							>
																								{filterOption}
																								<div
																									className={`w-[16px] h-[16px] flex items-center justify-center rounded-[1px] ${
																										activeFilters.includes(
																											// @ts-ignore
																											filterOption
																										)
																											? "bg-green-500"
																											: "bg-white"
																									}`}
																								></div>
																							</div>
																						</div>
																					)
																				}
																			)}
																		</div>
																		<div className="flex items-center justify-between">
																			<button
																				onClick={() => {
																					// @ts-ignore
																					setActiveFilters(["All"])
																				}}
																				className="border border-[#3A3A3A] rounded-full px-5 p-[6px]"
																			>
																				Reset
																			</button>
																			<button
																				className="bg-[#189a4c] rounded-full px-6 p-[6px]"
																				onClick={() => {
																					setOpenFilterMenu(false)
																				}}
																			>
																				Confirm
																			</button>
																		</div>
																	</div>
																) : null}
															</button>
														</>

														<div className="">
															{/* Pepe Users: <span className="font-light text-white/60"></span> */}
														</div>
													</div>
													<div className=" flex flex-col gap-[10px]">
														{/* @ts-ignore */}
														{data.airdrops.map((airdrop, index) => {
															if (airdrop.active === false) return
															if (
																activeFilters.length > 0 &&
																// @ts-ignore
																!activeFilters.includes(airdrop.blockchain)
															) {
																return <></>
															}
															return (
																<div
																	onClick={() => {
																		setOpenedAirdrop(airdrop)
																	}}
																	key={index}
																	className="w-full cursor-pointer flex flex-col gap-3 bg-[#191919] p-[12px] pr-[14px] rounded-[20px]"
																>
																	<div className="flex gap-4 w-full">
																		{airdrop?.image?.src && (
																			<div className="min-w-[50px] w-[50px] h-[50px] rounded-full bg-[#2e2e2e] overflow-hidden flex items-center justify-center">
																				<img
																					className="h-full w-full"
																					src={airdrop.image.src}
																				/>
																			</div>
																		)}
																		<div className="w-full flex flex-col gap-1">
																			<div
																				className="font-bold text-[21px]"
																				style={{
																					fontFamily: "Dela Gothic One",
																				}}
																			>
																				{airdrop.name}
																			</div>
																			<p className="text-white/60 font-light text-[12px] line-clamp-2">
																				{airdrop.description}
																			</p>
																		</div>
																	</div>
																	<div className="flex gap-1 items-center text-[12px]">
																		<button className="bg-[#189A4C] rounded-full px-3 p-1">
																			Active
																		</button>
																		<div className="border border-[#3A3A3A] rounded-full px-3 p-1">
																			{airdrop.blockchain}
																		</div>
																	</div>
																</div>
															)
														})}
													</div>
												</div>
											)}
										</>
									)
								case "Claim":
									return (
										<div className="h-full flex items-center justify-center text-[16px] text-white/60">
											Coming soon!
										</div>
									)
								case "Earn":
									return (
										<div className="h-full flex items-center justify-center text-[16px] text-white/60">
											Coming soon!
										</div>
									)
							}
						})()}
					</div>
				}
			</>
		)
	}
}