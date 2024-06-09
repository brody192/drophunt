import { useProxy } from "valtio/utils"
import { HomeRouteState } from "../routes/HomeRoute"
import Icons from "./Icons"

export default function Nav() {
	const local = useProxy(HomeRouteState)
	console.log(local.activePage, "active page")
	return (
		<div className="flex justify-between items-center">
			{/* if no airdrop is open, then show nav bar */}
			{local.openedAirdrop === null ? (
				<div className="flex bg-[#191919] text-[12px] rounded-full h-[33px] items-center font-light">
					<div
						onClick={() => {
							local.activePage = "Airdrops"
						}}
						style={local.activePage === "Airdrops" ? { fontWeight: 600 } : {}}
						className={`p-2 px-4 h-full flex cursor-pointer items-center justify-center rounded-full ${
							local.activePage === "Airdrops" ? "bg-[#2E2E2E]" : ""
						}`}
					>
						Airdrops
					</div>
					<div
						onClick={() => {
							local.activePage = "Claim"
						}}
						style={local.activePage === "Claim" ? { fontWeight: 600 } : {}}
						className={`p-2 px-4 h-full flex cursor-pointer items-center justify-center rounded-full ${
							local.activePage === "Claim" ? "bg-[#2E2E2E]" : ""
						}`}
					>
						Claim
					</div>
					<div
						onClick={() => {
							local.activePage = "Earn"
						}}
						style={local.activePage === "Earn" ? { fontWeight: 600 } : {}}
						className={`p-2 px-4 h-full cursor-pointer flex items-center justify-center rounded-full ${
							local.activePage === "Earn" ? "bg-[#2E2E2E]" : ""
						}`}
					>
						Earn
					</div>
				</div>
			) : (
				<div
					onClick={() => {
						local.openedAirdrop = null
					}}
					className="cursor-pointer hover:scale-[1.1] transition-all"
				>
					<Icons name="Back" />
				</div>
			)}
			{/* TODO: make it green and move it properly */}

			{/* <TonConnectButton className="ton-connect-page__button" /> */}
			<button className="bg-[#189A4C] rounded-full px-4 p-2">
				Connect Wallet
			</button>
		</div>
	)
}
