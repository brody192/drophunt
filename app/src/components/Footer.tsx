export default function Footer() {
	return (
		<>
			<div className="w-full h-[400px] flex flex-col gap-[18px] p-4 px-5 bg-[#191919]">
				<div className="flex space-x-25 justify-between">
					<div className="flex flex-col space-y-3">
						<h1 className="text-[18px] text-white headerFont">About</h1>
						<div className="text-white/70 space-y-3 text-[12px] text-nowrap">
							<p>Learn more about us</p>
							<p>What is PEPE</p>
							<p>Terms and Conditions</p>
						</div>
					</div>
					<div className="flex flex-col space-y-3 text-nowrap">
						<h1 className="text-[18px] text-white headerFont">Docs</h1>
						<div className="text-white/70 space-y-3 text-[12px]">
							<p>Documentation and Guides</p>
							<p>FAQ</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-[10px]">
					<h1 className="text-[18px] text-white headerFont">
						Join our community
					</h1>
					<div className="flex gap-[10px] text-white/50  text-[14px]">
						<div>Telegram</div>
						<div>Messager</div>
					</div>
				</div>
			</div>
		</>
	)
}
