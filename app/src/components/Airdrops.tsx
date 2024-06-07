// import AirdropPage from "./AirdropPage"

// export default function Airdrops(props: {
// 	currentAirdrop: number | null
// 	airdrops: {
// 		name: string
// 		description: string
// 		conditions: string
// 		actionUrl: string
// 		activeUntil: Date
// 		blockchain: string
// 		active: boolean
// 		orderNumber: number
// 		imageSrc: string
// 	}[]
// 	filterAll: boolean
// 	filterOnBlockChains: string[]
// 	availableBlockChains: string[]
// }) {
// 	if (props.currentAirdrop !== null) {
// 		return <AirdropPage airdrop={props.airdrops[props.currentAirdrop]} />
// 	} else {
// 		return (
// 			<div className="flex flex-col gap-[12px]">
// 				<div className="font-bold text-[18px]">Airdrops</div>
// 				<div className="flex items-center justify-between">
// 					<TokenButton
// 						filterAll={props.filterAll}
// 						filterOnBlockChains={props.filterOnBlockChains}
// 						availableBlockChains={props.availableBlockChains}
// 					/>
// 					<div className="">
// 						{/* Pepe Users: <span className="font-light text-white/60"></span> */}
// 					</div>
// 				</div>
// 				<div className=" flex flex-col gap-[10px]">
// 					{props.airdrops.map((airdrop, index) => {
// 						return (
// 							<Airdrop
// 								airdrop={airdrop}
// 								key={index}
// 								currentAirdrop={props.currentAirdrop}
// 							/>
// 						)
// 					})}
// 				</div>
// 			</div>
// 		)
// 	}
// }
