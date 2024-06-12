import { Elysia } from "elysia"
import { get } from "ronin"

const app = new Elysia()
	.get("/", async () => {
		const [airdrops, ads, global] = await Promise.all([
			get.airdrops(),
			get.ads(),
			get.global(),
		])
		return {
			airdrops,
			ads,
			global,
		}
	})
	.listen(8787)

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
