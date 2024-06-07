export default function Ads(props: {
	advertisement: {
		active: boolean
		imageUrl: string
		orderNumber: number
	}[]
}) {
	return (
		<div className="h-[180px] w-full rounded-[20px] flex items-center justify-center bg-[#2e2e2e]">
			{props.advertisement ? (
				<img src={props.advertisement[0].imageUrl} alt="Advertisement" />
			) : (
				<div>Nothing</div>
			)}
		</div>
	)
}
