import { Hono } from "hono"
import { ronin, type Bindings, type Variables } from "hono-ronin"
import { cors } from "hono/cors"

const app = new Hono<{
	Bindings: Bindings
	Variables: Variables
}>()
	.use("*", ronin(), cors())
	.get("/", async (c) => {
		const { get } = c.var.ronin
		const [airdrops, ads, global] = await Promise.all([
			get.airdrops(),
			get.ads(),
			get.global(),
		])
		return c.json({ airdrops, ads, global })
	})
	.post("/wallet-connected", async (c) => {
		const { create, get } = c.var.ronin
		const walletAddress = await c.req.param("wallet-address")
		const user = await get.user()
		console.log(walletAddress)
		return c.json({ walletAddress })
	})

export default app
export type AppType = typeof app
