export default function Footer() {
	return (
		<>
			<div className="w-full h-[400px] flex flex-col gap-[18px] p-4 px-5 bg-[#191919]">
				<div className="flex gap-[20px] justify-between">
					<div className="flex flex-col gap-[10px]">
						<div
							className="text-[18px]"
							style={{ fontFamily: "Dela Gothic One" }}
						>
							About
						</div>
						<div className="text-white/50  text-[14px]">
							<div>Learn more about us</div>
							<div>What is PEPE</div>
							<div>Terms and Conditions</div>
						</div>
					</div>
					<div className="flex flex-col gap-[10px]">
						<div
							className="text-[18px]"
							style={{ fontFamily: "Dela Gothic One" }}
						>
							Docs
						</div>
						<div className="text-white/50 text-[14px]">
							<div>Documentation and Guides</div>
							<div>FAQ</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-[10px]">
					<div
						className="text-[18px]"
						style={{ fontFamily: "Dela Gothic One" }}
					>
						Join our community
					</div>
					<div className="flex gap-[10px] text-white/50  text-[14px]">
						<div>Telegram</div>
						<div>Messager</div>
					</div>
				</div>
			</div>
		</>
	)
}
