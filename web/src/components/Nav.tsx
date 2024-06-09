import { useProxy } from "valtio/utils"
import { HomeRouteState } from "../routes/HomeRoute"

export default function Nav() {
	const local = useProxy(HomeRouteState)
	console.log(local.activePage, "active page")
	return <></>
}
