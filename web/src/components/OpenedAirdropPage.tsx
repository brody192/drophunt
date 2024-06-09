import { useProxy } from "valtio/utils"
import { HomeRouteState } from "../routes/HomeRoute"

export default function OpenedAirdropPage() {
	const local = useProxy(HomeRouteState)

	return (
		<>
			{local.openedAirdrop !== null && (
				<>
					{/* opened airdrop content */}
					<div className="flex flex-col justify-between items-center w-full gap-[22px]">
						<div className="h-full overflow-hidden bg-[#2E2E2E] w-full rounded-[20px]">
							<div className="flex gap-3 items-center px-4 p-3">
								{local.openedAirdrop?.image?.src && (
									<img
										src={local.openedAirdrop.image.src}
										className="w-[50px] h-[50px] bg-[#3a3a3a] rounded-full"
									/>
								)}
								<div className="flex flex-col">
									<div className="text-[22px] font-bold">
										{local.openedAirdrop.name}
									</div>
									<div className="flex gap-2 items-center">
										<div className="bg-[#189A4C] px-3 p-1 rounded-full">
											{local.openedAirdrop.active && "Active"}
										</div>
										<div className="border rounded-full border-[#3A3A3A] px-3 p-1">
											{local.openedAirdrop.blockchain}
										</div>
									</div>
								</div>
							</div>
							<div className="bg-[#232323] w-full p-4">
								<div className="text-sm text-white/70 font-light">
									{local.openedAirdrop.description}
								</div>
							</div>
							<div className="bg-[#191919] w-full p-4">
								<div className="font-bold text-[20px]">Conditions</div>
								{local.openedAirdrop.conditions
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
						{local.openedAirdrop.actionUrl && (
							<button
								className="bg-[#23C463] rounded-full w-full p-4 text-[18px] mt-[20px]"
								onClick={() => {
									// TODO:
								}}
							>
								Action
							</button>
						)}
					</div>
				</>
			)}
		</>
	)
}