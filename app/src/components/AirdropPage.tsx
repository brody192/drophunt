// import { useState } from "react"
// import { Link } from "./Link/Link"

// export default function AirdropPage(props: {
// 	airdrop: {
// 		name: string
// 		description: string
// 		conditions: string
// 		actionUrl: string
// 		activeUntil: Date
// 		blockchain: string
// 		active: boolean
// 		orderNumber: number
// 		imageSrc: string
// 	}
// }) {
// 	const [conditions] = useState(["Sign up to Telegram channel"])
// 	const handleAttachmentClick = (event: React.MouseEvent<HTMLDivElement>) => {
// 		event.stopPropagation()
// 	}
// 	const [showBalance, setShowBalance] = useState(false)
// 	return (
// 		<div className="flex flex-col justify-between items-center w-full gap-[22px]">
// 			<div className="h-full overflow-hidden bg-[#2E2E2E] w-full rounded-[20px]">
// 				<div className="flex gap-3 items-center px-4 p-3">
// 					<div className="w-[50px] h-[50px] bg-[#3a3a3a] rounded-full"></div>
// 					<div className="flex flex-col">
// 						<div className="text-[22px] font-bold">PEPE TON</div>
// 						<div className="flex gap-2 items-center">
// 							<div className="bg-[#189A4C] px-3 p-1 rounded-full">Active</div>
// 							<div className="border rounded-full border-[#3A3A3A] px-3 p-1">
// 								The Open Network
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="bg-[#232323] w-full p-4">
// 					<div className="text-[20px] font-bold">Description</div>
// 					<p className="text-[12px] text-white/60">Airdrop instructions</p>
// 				</div>
// 				<div className="bg-[#191919] w-full p-4">
// 					<div className="font-bold text-[20px]">Conditions</div>
// 					{conditions.map((condition, index) => {
// 						return (
// 							<div
// 								key={index}
// 								className="flex items-center w-full gap-2 text-white/60 text-[12px]"
// 							>
// 								<div className="w-[8px] h-[8px] bg-[#189A4C] rounded-full"></div>
// 								{condition}
// 							</div>
// 						)
// 					})}
// 				</div>
// 			</div>
// 			{/* <button className="border border-[#3A3A3A] px-[45px] py-[21px] rounded-full text-[18px] text-[#23C463]">
// 				Raise to the Top
// 			</button> */}
// 			<div className="text-[20px] tracking-tighter font-bold bg-[#191919] rounded-[20px] flex flex-col items-center justify-center w-full p-4">
// 				<div>Remaining Time</div>
// 				<div>1 hour</div>
// 			</div>
// 			<button className="bg-[#23C463] rounded-full w-full p-4 text-[18px] mt-[20px]">
// 				Action
// 			</button>
// 			{showBalance ? (
// 				<div
// 					id="balanceModal"
// 					onClick={() => {
// 						setShowBalance(false)
// 					}}
// 					className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center px-[32px]"
// 				>
// 					<div
// 						onClick={handleAttachmentClick}
// 						className="bg-black border border-[#3A3A3A] rounded-[20px] flex flex-col gap-4 p-4 w-full "
// 					>
// 						<div className="font-bold text-[20px]">
// 							<div>Balance:</div>
// 							<div className="text-white/70">$12563</div>
// 						</div>
// 						<input
// 							type="text"
// 							className="bg-[#191919] rounded-md w-full px-4 p-3 outline-none"
// 							placeholder="Amount..."
// 						/>
// 						<Link to="https://t.me/pepecoin_ton">
// 							<div className="bg-[#23C463] rounded-full w-full p-2 flex items-center justify-center text-[18px] mt-[20px]">
// 								Action
// 							</div>
// 						</Link>
// 					</div>
// 				</div>
// 			) : null}
// 		</div>
// 	)
// }
