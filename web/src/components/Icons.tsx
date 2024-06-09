interface Props {
	name: string
	size?: [number, number]
}

export default function Icons(props: Props) {
	const height = props.size && props.size[1] ? `${props.size[1]}px` : "24px"
	const width = props.size && props.size[0] ? `${props.size[0]}px` : "24px"
	switch (props.name) {
		case "ArrowDown":
			return (
				<svg
					width={width}
					height={height}
					viewBox="0 0 24 24"
					fill="white"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 15.25L16.25 9.75H7.75L12 15.25Z"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
				</svg>
			)
		case "Back":
			return (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19.25 4.75V19.25"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
					<path
						d="M4.75 12H15.25"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
					<path
						d="M8.25 8.75L4.75 12L8.25 15.25"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
				</svg>
			)
	}
}
